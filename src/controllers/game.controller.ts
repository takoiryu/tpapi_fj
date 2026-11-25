
import { Request, Response } from 'express';
import { gameService as s } from '../services/game.service.js';

export const gameController = {
  getAll: (_req: Request, res: Response) => res.json(s.getAll()),
  getById: (req: Request, res: Response) => res.json(s.getById(req.params.id)),
  create: (req: Request, res: Response) => res.status(201).json(s.create(req.body)),
  update: (req: Request, res: Response) => res.json(s.update(req.params.id, req.body)),
  delete: (req: Request, res: Response) => { s.delete(req.params.id); res.status(204).send(); },
};