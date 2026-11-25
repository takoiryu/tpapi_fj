// src/routes/game.routes.ts
import { Router } from 'express';
import { gameController as c } from '../controllers/game.controller.js';

export const gameRoutes = Router();
gameRoutes.get('/', c.getAll).get('/:id', c.getById).post('/', c.create).put('/:id', c.update).delete('/:id', c.delete);