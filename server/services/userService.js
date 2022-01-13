import User from '../models/User.js';

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};
