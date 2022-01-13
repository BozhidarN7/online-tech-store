import mongoose from 'mongoose';

export default () => {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://localhost:27017/online-tech-shop');
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.error('Failed to connect to database...');
            reject(err);
        });

        db.on('open', () => {
            console.log('Successfully connected to database...');
            resolve();
        });
    });
};
