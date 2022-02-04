import mongoose from 'mongoose';

import User from '../models/User.js';

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const getUserById = async (id) => {
    return await User.findById(id).populate(['cart', 'favorites']);
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const addProductToFavorites = async (userId, productId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { favorites: productId } },
        { new: true }
    );
};

export const removeProductFromFavorites = async (userId, productId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $pull: { favorites: productId } },
        { new: true }
    );
};

export const addProductToCart = async (userId, productId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { cart: productId } },
        { new: true }
    );
};

export const removeProductFromCart = async (userId, productId) => {
    return await User.findByIdAndUpdate(
        userId,
        { $pull: { cart: productId } },
        { new: true }
    );
};

export const addRate = async (userId, productId, rating) => {
    return await User.findByIdAndUpdate(
        userId,
        { $push: { ratings: { product: productId, rating } } },
        { new: true }
    );
};

export const populateSpecificUserFields = async (userId, fields) => {
    return await User.findById(userId, fields);
};
