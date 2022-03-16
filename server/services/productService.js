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

export const addRate = async (userId, productId, userRating) => {
    const product = await Product.findById(productId);
    product.votes += 1;
    product.ratingScore.push({ rating: userRating, user: userId });

    const totalRatingScore = product.ratingScore.reduce(
        (score, x) => (score += x.rating),
        0
    );
    product.rating = Math.round(totalRatingScore / product.votes);

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

export const reduceQuantities = async (productsIds, quantities) => {
    const products = await Product.find({ _id: { $in: productsIds } });
    products.forEach(async (product, i) => {
        // TODO Check should be done to ensure that the quantity is in stock
        product.quantity -= quantities[i];
        await product.save();
    });

    return products;
};
