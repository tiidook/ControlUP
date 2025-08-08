import { Router } from 'express';
import movieRouter from './movie.router.js'

const router = new Router();

router.use('/movie', movieRouter);

export default router;