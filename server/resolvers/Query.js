import * as productService from '../services/productService.js';
import * as userService from '../services/userService.js';
import buildError from '../utils/buildError.js';

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

export default {
    info,
    products,
    product,
    user,
};
