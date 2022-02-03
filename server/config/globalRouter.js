import logger from '../utils/logger.js';

export default (app) => {
    app.post('/errors', (req, res, next) => {
        logger.log({ err: { ...req.body }, level: 'error', type: 'client' });

        res.status(404).end();
    });
};
