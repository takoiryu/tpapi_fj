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
      if (!games) {
        res.status(404).json({ message: 'Jeu introuvable.' });
        return;
      }
      res.status(200).json(games);
    } catch (error) {
      res.status(404).json({
        message:'not found',
        error: error instanceof Error ? error.message : String(error),
      })
      res.status(400).json({
        message:'id not valid',
        error: error instanceof Error ? error.message : String(error),
      })
      res.status(500).json({
        message: 'Erreur lors de la récupération des données.',
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };
}

export const gameController = new GameController();