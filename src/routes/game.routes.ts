import { Router } from 'express';
import { gameController } from '../controllers/game.controller.js';

export const gameRoutes = Router();

gameRoutes.get('/', gameController.getAll);
gameRoutes.get('/:id', gameController.getById);