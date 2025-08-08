import express from 'express';
import cors from 'cors';

import errorMiddleware from './src/middlewares/error.middleware.js';
import appRouter from './src/routes/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

const start = async () => {
    try {
        app.use(cors());

        app.use(express.json());
        app.use('/api/v1', appRouter);
        app.use(errorMiddleware)

        app.listen(PORT, () => {
            console.log('SERVER STARTED', PORT)
        })
    } catch (e) {
        console.log('ERROR', e)
    }
}
start()