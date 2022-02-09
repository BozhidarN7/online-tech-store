import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name!'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email!'],
        unique: [true, 'Already have a user with that email!'],
        validate: {
            validator: function (value) {
                return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
                    value
                );
            },
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    ratings: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductId',
            },
            rating: Number,
        },
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);
export default User;
