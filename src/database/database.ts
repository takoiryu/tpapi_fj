import Database from 'better-sqlite3';
import path from 'path';
export const projectRoot = path.resolve(__dirname, '../..');

const dbPath = path.join(projectRoot, 'src/database/game.db');

export const db = new Database(dbPath);