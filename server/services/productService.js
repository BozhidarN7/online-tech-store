import mongoose from 'mongoose';

import Product from '../models/Product.js';

export const getAllProducts = async () => {
    return await Product.find({});
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const addUserToFavoritesTo = async (userId, productId) => {
    const mongoUserId = mongoose.Types.ObjectId(userId);

    return await Product.findByIdAndUpdate(productId, { $push: { favoriteTo: mongoUserId } }, { new: true });
};

export const addUserToInCartTo = async (userId, productId) => {
    const mongoUserId = mongoose.Types.ObjectId(userId);

    return await Product.findByIdAndUpdate(productId, { $push: { inCartTo: mongoUserId } }, { new: true });
};
