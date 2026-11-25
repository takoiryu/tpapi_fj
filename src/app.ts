import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import { projectRoot } from './database/database.js';
import { gameRoutes } from './routes/game.routes.js';

const app = express();

app.use(express.json());

const openApiPath = path.join(projectRoot, 'docs/openapi.yaml');
const openApiContent = fs.readFileSync(openApiPath, 'utf8');

const swaggerDocument = YAML.parse(openApiContent);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/games', gameRoutes);

export default app;