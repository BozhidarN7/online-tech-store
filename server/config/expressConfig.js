import express, { urlencoded } from 'express';
import cors from 'cors';

export default (app) => {
    app.use(express.json());
    app.use(urlencoded({ extended: true }));
    app.use(cors());
};
