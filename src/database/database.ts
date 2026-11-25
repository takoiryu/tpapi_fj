import Database from 'better-sqlite3';
import path from 'path';

export const projectRoot = process.cwd();

const dbPath = path.join(projectRoot, 'src/database/game.db');

export const db = new Database(dbPath);