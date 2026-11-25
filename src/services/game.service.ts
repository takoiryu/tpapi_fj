import { Game } from '../models/game.model.js';
import { gameRepository } from '../repositories/game.repository.js';
export class InvalidIdError extends Error {
  constructor(message = 'Identifiant invalide.') {
    super(message);
    this.name = 'InvalidIdError';
  }
}
export class GameService {
  getAll(): Game[] {
    return gameRepository.findAll();
  }
  getById(rawId: unknown): Game | undefined {
    const id = Number(rawId);

    if (!Number.isInteger(id) || id <= 0) {
      throw new InvalidIdError("L'identifiant doit être un entier strictement positif.");
    }

    return gameRepository.findById(id);
  }
}


export const gameService = new GameService();