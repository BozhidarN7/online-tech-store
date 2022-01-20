import mongoose from 'mongoose';

import User from '../models/User.js';

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const addProductToFavorites = async (userId, productId) => {
    const mongoProductId = mongoose.Types.ObjectId(productId);

    return await User.findByIdAndUpdate(userId, { $push: { favorites: mongoProductId } }, { new: true });
};

export const addProductToCart = async (userId, productId) => {
    const mongoProductId = mongoose.Types.ObjectId(productId);

    return await User.findByIdAndUpdate(userId, { $push: { cart: mongoProductId } }, { new: true });
};
