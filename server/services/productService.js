import mongoose from 'mongoose';

import Product from '../models/Product.js';

export const getAllProducts = async () => {
    return await Product.find({});
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const addUserToFavoritesTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(productId, { $push: { favoriteTo: userId } }, { new: true });
};

export const removeUserFromFavoritesTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(productId, { $pull: { favoriteTo: userId } }, { new: true });
};

export const addUserToInCartTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(productId, { $push: { inCartTo: userId } }, { new: true });
};

export const removeUserFromCartTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(productId, { $pull: { inCartTo: userId } }, { new: true });
};
