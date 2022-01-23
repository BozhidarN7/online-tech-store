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

const addToFavorites = async (parent, args, context, info) => {
    if (!context.user) {
        return {
            code: '401',
            success: false,
            message: 'Unauthorized request!',
        };
    }

    const productId = args.productId;
    const userId = args.userId;

    try {
        const user = await userService.addProductToFavorites(userId, productId);
        const product = await productService.addUserToFavoritesTo(userId, productId);

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

const addToCart = async (parent, args, context, info) => {
    // if (!context.user) {
    //     return {
    //         code: '401',
    //         success: false,
    //         message: 'Unauthorized request!',
    //     };
    // }

    const productId = args.productId;
    const userId = args.userId;

    try {
        const user = await userService.addProductToCart(userId, productId);
        const product = await productService.addUserToInCartTo(userId, productId);

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

export default { signUp, signIn, addToFavorites, addToCart };
