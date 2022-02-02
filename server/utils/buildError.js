import mongoose from 'mongoose';

export default (err) => {
    if (
        err instanceof mongoose.Error.CastError ||
        err instanceof mongoose.Error.ValidationError
    ) {
        err.message = 'Wrong input data!';
        return err;
    }

    err.message = 'Server error!';
    return err;
};
