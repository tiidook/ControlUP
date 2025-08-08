import { Router } from 'express';

import movieController from '../modules/movies/controller.js'

const router = Router()

router.get('/', movieController.getMovies);

export default router;