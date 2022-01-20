import * as productService from '../services/productService.js';

const info = () => 'Hello from the server!';

const products = async () => {
    return await productService.getAllProducts();
};

const product = async (parent, args, context, info) => {
    return await productService.getProductById(args.id);
};

export default {
    info,
    products,
    product,
};
