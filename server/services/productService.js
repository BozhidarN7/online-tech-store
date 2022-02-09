import mongoose from 'mongoose';

import Product from '../models/Product.js';

export const getAllProducts = async (limit) => {
    return await Product.find({}).limit(limit);
};

export const getProductById = async (id) => {
    return await Product.findById(id);
};

export const addUserToFavoritesTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(
        productId,
        { $push: { favoriteTo: userId } },
        { new: true }
    );
};

export const removeUserFromFavoritesTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(
        productId,
        { $pull: { favoriteTo: userId } },
        { new: true }
    );
};

export const addUserToInCartTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(
        productId,
        { $push: { inCartTo: userId } },
        { new: true }
    );
};

export const removeUserFromCartTo = async (userId, productId) => {
    return await Product.findByIdAndUpdate(
        productId,
        { $pull: { inCartTo: userId } },
        { new: true }
    );
};

export const addRate = async (productId, userRating) => {
    const product = await Product.findById(productId);
    product.votes += 1;
    product.ratingScore += userRating;
    product.rating = Math.round(product.ratingScore / product.votes);

    await product.save();
    return product;
};

export const addOpinion = async (userId, productId, opinion) => {
    return await Product.findByIdAndUpdate(
        productId,
        {
            $push: { opinions: { user: userId, opinion } },
        },
        { new: true }
    );
};
