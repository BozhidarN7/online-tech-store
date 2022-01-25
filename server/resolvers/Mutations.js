import mongoose from 'mongoose';

import * as userService from '../services/userService.js';
import * as productService from '../services/productService.js';
import { setUserRole } from '../utils/setUserRole.js';

const signUp = async (parent, args, context, info) => {
    await setUserRole(context.user.uid);
    return await userService.createUser(args);
};

const signIn = async (parent, args, context, info) => {
    return await userService.getUserByEmail(args.email);
};

const addRemoveToFavorites = async (parent, args, context, info) => {
    // if (!context.user) {
    //     return {
    //         code: '401',
    //         success: false,
    //         message: 'Unauthorized request!',
    //     };
    // }

    const productId = args.productId;
    const mongoProductId = mongoose.Types.ObjectId(productId);

    const userId = args.userId;
    const mongoUserId = mongoose.Types.ObjectId(userId);

    try {
        const { favorites } = await userService.populateSpecificUserFields(userId, { _id: 0, favorites: 1 });

        const isProductInFavorites = favorites.includes(mongoProductId);

        let user = null;
        let product = null;

        if (isProductInFavorites) {
            user = await userService.removeProductFromFavorites(mongoUserId, mongoProductId);
            product = await productService.removeUserFromFavoritesTo(mongoUserId, mongoProductId);
        } else {
            user = await userService.addProductToFavorites(mongoUserId, mongoProductId);
            product = await productService.addUserToFavoritesTo(mongoUserId, mongoProductId);
        }

        return {
            code: '200',
            success: true,
            message: 'Operation successful!',
            user,
            product,
        };
    } catch (err) {
        console.log(err);
    }
};

const addRemoveToCart = async (parent, args, context, info) => {
    // if (!context.user) {
    //     return {
    //         code: '401',
    //         success: false,
    //         message: 'Unauthorized request!',
    //     };
    // }

    const productId = args.productId;
    const mongoProductId = mongoose.Types.ObjectId(productId);

    const userId = args.userId;
    const mongoUserId = mongoose.Types.ObjectId(userId);

    try {
        const { cart } = await userService.populateSpecificUserFields(userId, { _id: 0, cart: 1 });

        const isProductInCart = cart.includes(mongoProductId);

        let user = null;
        let product = null;

        if (isProductInCart) {
            user = await userService.removeProductFromCart(userId, productId);
            product = await productService.removeUserFromCartTo(userId, productId);
        } else {
            user = await userService.addProductToCart(userId, productId);
            product = await productService.addUserToInCartTo(userId, productId);
        }
        return {
            code: '200',
            success: true,
            message: 'Operation successful!',
            user,
            product,
        };
    } catch (err) {
        console.log(err);
    }
};

export default { signUp, signIn, addRemoveToFavorites, addRemoveToCart };
