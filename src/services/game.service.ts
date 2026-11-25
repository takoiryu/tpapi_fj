import { Game } from '../models/game.model.js';
import { gameRepository } from '../repositories/game.repository.js';

export class GameService {
  getAll(): Game[] {
    return gameRepository.findAll();
  }
  getById(id: number): Game | undefined {
    return gameRepository.findById(id);
  }
}

export const gameService = new GameService();