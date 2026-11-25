import { CreateGameInput, Game } from '../models/game.model.js';
import { gameRepository } from '../repositories/game.repository.js';

export class HttpError extends Error {
  status: number;
  details?: string[];

  constructor(status: number, message: string, details?: string[]) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

function parseId(rawId: unknown): number {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "L'identifiant doit être un entier strictement positif.");
  }
  return id;
}

function validateGame(body: unknown): CreateGameInput {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new HttpError(400, 'Données invalides', ['Le corps de la requête doit être un objet JSON.']);
  }

  const { title, manufacturer, releaseYear, type, ratio } = body as Record<string, unknown>;
  const details: string[] = [];

  if (typeof title !== 'string' || !title.trim()) details.push('Le titre est obligatoire');
  if (typeof manufacturer !== 'string' || !manufacturer.trim()) details.push('Le fabricant est obligatoire');
  if (typeof type !== 'string' || !type.trim()) details.push('Le type est obligatoire');
  if (typeof releaseYear !== 'number' || !Number.isInteger(releaseYear) || releaseYear < 1950 || releaseYear > 2100) {
    details.push("L'année doit être un entier entre 1950 et 2100");
  }
  if (typeof ratio !== 'number' || !Number.isFinite(ratio) || ratio < 0 || ratio > 10) {
    details.push('Le ratio doit être un nombre entre 0 et 10');
  }

  if (details.length > 0) {
    throw new HttpError(400, 'Données invalides', details);
  }

  return {
    title: (title as string).trim(),
    manufacturer: (manufacturer as string).trim(),
    releaseYear: releaseYear as number,
    type: (type as string).trim(),
    ratio: ratio as number,
  };
}

export class GameService {
  getAll = (): Game[] => gameRepository.findAll();

  getById = (rawId: unknown): Game => {
    const game = gameRepository.findById(parseId(rawId));
    if (!game) throw new HttpError(404, 'Jeu introuvable');
    return game;
  };

  create = (body: unknown): Game => gameRepository.create(validateGame(body));

  update = (rawId: unknown, body: unknown): Game => {
    const id = parseId(rawId);
    const data = validateGame(body);
    const updated = gameRepository.update(id, data);
    if (!updated) throw new HttpError(404, 'Jeu introuvable');
    return updated;
  };

  delete = (rawId: unknown): void => {
    const deleted = gameRepository.delete(parseId(rawId));
    if (!deleted) throw new HttpError(404, 'Jeu introuvable');
  };
}

export const gameService = new GameService();