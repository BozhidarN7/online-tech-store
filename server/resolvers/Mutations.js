import mongoose from 'mongoose';

import * as userService from '../services/userService.js';
import * as productService from '../services/productService.js';
import { setUserRole } from '../utils/setUserRole.js';
import buildError from '../utils/buildError.js';
import { stripe } from '../config/stripeConfig.js';

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

const rate = async (parent, args, context, info) => {
    const userId = args.userId;
    const productId = args.productId;
    const rating = args.rating;

    try {
        const user = await userService.addRate(userId, productId, rating);
        const product = await productService.addRate(userId, productId, rating);
        return {
            res: 200,
            success: true,
            message: 'Operation successful',
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
    const userId = args.userId;

    let user = undefined;

    try {
        user = await userService.getUserById(userId);
    } catch (err) {
        console.log(err);
        return;
    }

    const totalPrice = products
        .reduce((sum, product) => (sum += product.price), 0)
        .toFixed(2);

    if (!user.stripeCustomerId) {
        try {
            const customer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                metadata: {
                    userId,
                },
            });
            user.stripeCustomerId = customer.id;
            user = await user.save();

            const paymentIntent = await stripe.paymentIntents.create({
                customer: customer.id,
                setup_future_usage: 'off_session',
                amount: totalPrice * 100,
                currency: 'bgn',
                automatic_payment_methods: {
                    enabled: true,
                },
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
    } else {
        try {
            const paymentMethods = await stripe.paymentMethods.list({
                customer: 'cus_LKzrTm8PfzIPe0',
                type: 'card',
            });

            const paymentIntent = await stripe.paymentIntents.create({
                customer: 'cus_LKzrTm8PfzIPe0',
                amount: totalPrice * 100,
                currency: 'bgn',
                payment_method: paymentMethods.data[0].id,
                off_session: true,
                confirm: true,
            });

            return {
                code: '200',
                success: true,
                message: 'Success',
                clientSecret: paymentIntent.client_secret,
            };
        } catch (err) {
            console.log('Error code is: ', err.code);
            console.log(err.message);
            // const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(
            //     err.raw.payment_intent.id
            // );
            // console.log('PI retrieved', paymentIntentRetrieved.id);
            return;
        }
    }
};

const reduceQuantities = async (parent, args, context, info) => {
    const productsIds = args.productsIds;
    const quantities = args.quantities;
    const products = productService.reduceQuantities(productsIds, quantities);
    try {
        return {
            code: '200',
            success: true,
            message: 'Sucesss',
            products,
        };
    } catch (err) {
        console.log(err);
    }
};

const addOpinion = async (parent, args, context, info) => {
    const mongoProductId = mongoose.Types.ObjectId(args.productId);
    const mongoUserId = mongoose.Types.ObjectId(args.userId);
    const opinion = args.opinion;

    try {
        const product = await productService.addOpinion(
            mongoUserId,
            mongoProductId,
            opinion
        );

        return {
            code: '200',
            success: true,
            message: 'Success',
            product,
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
    rate,
    buyProducts,
    reduceQuantities,
    addOpinion,
};
