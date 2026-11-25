import { db } from '../database/database.js';
import { CreateGameInput, Game } from '../models/game.model.js';

interface TankRow {
  id: number;
  title: string;
  manufacturer: string;
  release_year: number;
  type: string;
  ratio: number;
}

function mapRowToGame(row: TankRow): Game {
  return new Game({
    id: row.id,
    title: row.title,
    manufacturer: row.manufacturer,
    releaseYear: row.release_year,
    type: row.type,
    ratio: row.ratio,
  });
}

export class GameRepository {
  findAll(): Game[] {
    const stmt = db.prepare('SELECT id, title, manufacturer, release_year, type, ratio FROM tank');
    const rows = stmt.all() as TankRow[];
    return rows.map(mapRowToGame);
  }

  findById(id: number): Game | undefined {
    const stmt = db.prepare(
      'SELECT id, title, manufacturer, release_year, type, ratio FROM tank WHERE id = ?'
    );
    const row = stmt.get(id) as TankRow | undefined;
    return row ? mapRowToGame(row) : undefined;
  }

  create(input: CreateGameInput): Game {
    const stmt = db.prepare(
      `INSERT INTO tank (title, manufacturer, release_year, type, ratio)
       VALUES (@title, @manufacturer, @releaseYear, @type, @ratio)`
    );

    const result = stmt.run({
      title: input.title,
      manufacturer: input.manufacturer,
      releaseYear: input.releaseYear,
      type: input.type,
      ratio: input.ratio,
    });

    const created = this.findById(Number(result.lastInsertRowid));
    if (!created) {
      throw new Error('Impossible de récupérer l’enregistrement nouvellement créé.');
    }
    return created;
  }

  update(id: number, input: Partial<CreateGameInput>): Game | undefined {
    const existing = this.findById(id);
    if (!existing) {
      return undefined;
    }

    const updatedData: CreateGameInput = {
      title: input.title ?? existing.title,
      manufacturer: input.manufacturer ?? existing.manufacturer,
      releaseYear: input.releaseYear ?? existing.releaseYear,
      type: input.type ?? existing.type,
      ratio: input.ratio ?? existing.ratio,
    };

    const stmt = db.prepare(
      `UPDATE tank
       SET title = @title,
           editor = @manufacturer,
           release_year = @releaseYear,
           type = @type,
           ratio = @ratio
       WHERE id = @id`
    );

    stmt.run({
      id,
      title: updatedData.title,
      manufacturer: updatedData.manufacturer,
      releaseYear: updatedData.releaseYear,
      type: updatedData.type,
      ratio: updatedData.ratio,
    });

    return this.findById(id);
  }

  delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM tank WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}

export const gameRepository = new GameRepository();