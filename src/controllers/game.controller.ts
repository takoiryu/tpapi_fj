import { Request, Response } from 'express';
import { gameService } from '../services/game.service.js';

export class GameController {
  getAll = (_req: Request, res: Response): void => {
    try {
      const games = gameService.getAll();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des données.',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
  getById = (_req: Request, res: Response): void => {
    try {
      const games = gameService.getById(Number(_req.params.id));
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({
        message: 'Erreur lors de la récupération des données.',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}

export const gameController = new GameController();