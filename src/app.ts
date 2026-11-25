import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import { projectRoot } from './database/database.js';
import { gameRoutes } from './routes/game.routes.js';
import { HttpError } from './services/game.service.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ status: 'ok', docs: '/api/docs', games: '/api/games' });
});

const openApiPath = path.join(projectRoot, 'docs/openapi.yaml');
const swaggerDocument = YAML.parse(fs.readFileSync(openApiPath, 'utf8'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/games', gameRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    return res.status(400).json({ error: 'JSON mal formé' });
  }

  return res.status(500).json({
    error: 'Erreur interne du serveur',
    message: err instanceof Error ? err.message : String(err),
  });
});

export default app;