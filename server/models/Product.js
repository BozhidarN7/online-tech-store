import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Please specify a product brand!'],
    },
    model: {
        type: String,
        required: [true, 'Please specify a product model!'],
    },
    category: {
        type: String,
        enum: ['Laptops', 'Monitors', 'Drones'],
        required: [true, 'Please specify a product category'],
    },
    description: String,
    price: {
        type: Number,
        required: [true, 'Please specify product price!'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
        required: [true, 'Please provide a image!'],
    },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;