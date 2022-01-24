import * as productService from '../services/productService.js';
import * as userService from '../services/userService.js';

const info = () => 'Hello from the server!';

const products = async () => {
    return await productService.getAllProducts();
};

const product = async (parent, args, context, info) => {
    return await productService.getProductById(args.id);
};

const user = async (parent, args, context, info) => {
    const id = args.id;

    if (!id) {
        return null;
    }

    return await userService.getUserById(args.id);
};

export default {
    info,
    products,
    product,
    user,
};
