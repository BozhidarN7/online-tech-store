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
        enum: ['laptops', 'monitors', 'drones'],
        required: [true, 'Please specify a product category'],
    },
    description: String,
    price: {
        type: Number,
        required: [true, 'Please specify product price!'],
    },
    ratingScore: [
        {
            rating: {
                type: Number,
                default: 0,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    ],
    rating: {
        type: Number,
        default: 0,
    },
    votes: {
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
    favoriteTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    inCartTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    opinions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            opinion: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;
