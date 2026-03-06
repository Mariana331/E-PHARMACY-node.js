import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import authRouters from './routes/auth.js';
import shopRouters from './routes/shop.js';
import statisticsRouters from './routes/statistics.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import * as fs from 'node:fs';
import path from 'path';

const SWAGGER_DOCUMENT = JSON.parse(
  fs.readFileSync(path.join('docs', 'swagger.json')),
);

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(SWAGGER_DOCUMENT));

  app.use(cookieParser());

  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());

  app.use('/api/user', authRouters);
  app.use('/api/shop', shopRouters);
  app.use('/api', statisticsRouters);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
