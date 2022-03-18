import * as productService from '../services/productService.js';
import * as userService from '../services/userService.js';
import buildError from '../utils/buildError.js';
import { stripe } from '../config/stripeConfig.js';

const info = () => 'Hello from the server!';

const products = async (parent, args, context, info) => {
    const limit = args.limit;
    try {
        return await productService.getAllProducts(limit);
    } catch (err) {
        console.log(err);
        throw buildError(err);
    }
};

const product = async (parent, args, context, info) => {
    try {
        return await productService.getProductById(args.id);
    } catch (err) {
        console.log(err);
        throw buildError(err);
    }
};

const user = async (parent, args, context, info) => {
    const id = args.id;

    if (!id) {
        return null;
    }
    try {
        return await userService.getUserById(args.id);
    } catch (err) {
        throw buildError(err);
    }
};

const userPaymentCards = async (parent, args, context, info) => {
    const userId = args.userId;

    const user = await userService.getUserById(userId);

    const paymentMethods = await stripe.paymentMethods.list({
        customer: user.stripeCustomerId,
        type: 'card',
    });

    const result = paymentMethods.data.map((cardInfo) => {
        return {
            _id: cardInfo.id,
            lastFourDigits: cardInfo.card.last4,
            expMonth: cardInfo.card.exp_month,
            expYear: cardInfo.card.exp_year,
        };
    });
    return result;
};

export default {
    info,
    products,
    product,
    user,
    userPaymentCards,
};
