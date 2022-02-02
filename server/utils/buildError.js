import mongoose from 'mongoose';
import logger from '../utils/logger.js';

export default (err) => {
    if (
        err instanceof mongoose.Error.CastError ||
        err instanceof mongoose.Error.ValidationError
    ) {
        logger.log({ err, level: 'error' });
        err.message = 'Wrong input data!';
        return err;
    }

    logger.log({ err, level: 'error' });
    err.message = 'Server error!';
    return err;
};
