import mongoose from 'mongoose';
import Stripe from 'stripe';

import * as userService from '../services/userService.js';
import * as productService from '../services/productService.js';
import { setUserRole } from '../utils/setUserRole.js';
import buildError from '../utils/buildError.js';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

const signUp = async (parent, args, context, info) => {
    try {
        await setUserRole(context.user.uid);
        return await userService.createUser(args);
    } catch (err) {
        throw buildError(err);
    }
};

const signIn = async (parent, args, context, info) => {
    try {
        return await userService.getUserByEmail(args.email);
    } catch (err) {
        console.log(err);
        throw buildError(err);
    }
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
        const { favorites } = await userService.populateSpecificUserFields(
            userId,
            { _id: 0, favorites: 1 }
        );

        const isProductInFavorites = favorites.includes(mongoProductId);

        let user = null;
        let product = null;

        if (isProductInFavorites) {
            user = await userService.removeProductFromFavorites(
                mongoUserId,
                mongoProductId
            );
            product = await productService.removeUserFromFavoritesTo(
                mongoUserId,
                mongoProductId
            );
        } else {
            user = await userService.addProductToFavorites(
                mongoUserId,
                mongoProductId
            );
            product = await productService.addUserToFavoritesTo(
                mongoUserId,
                mongoProductId
            );
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
        throw buildError(err);
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
        const { cart } = await userService.populateSpecificUserFields(userId, {
            _id: 0,
            cart: 1,
        });

        const isProductInCart = cart.includes(mongoProductId);

        let user = null;
        let product = null;

        if (isProductInCart) {
            user = await userService.removeProductFromCart(userId, productId);
            product = await productService.removeUserFromCartTo(
                userId,
                productId
            );
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
        throw buildError(err);
    }
};

const buyProducts = async (parent, args, context, info) => {
    const products = args.products;
    const totalPrice = products
        .reduce((sum, product) => (sum += product.price), 0)
        .toFixed(2);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'bgn',
        });

        return {
            code: '200',
            success: true,
            message: 'Success',
            clientSecret: paymentIntent.client_secret,
        };
    } catch (err) {
        throw buildError(err);
    }
};

export default {
    signUp,
    signIn,
    addRemoveToFavorites,
    addRemoveToCart,
    buyProducts,
};
