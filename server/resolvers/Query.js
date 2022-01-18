import * as productService from '../services/productService.js';

const info = () => 'Hello from the server!';

const products = async () => {
    return await productService.getAllProducts();
};

export default {
    info,
    products,
};
