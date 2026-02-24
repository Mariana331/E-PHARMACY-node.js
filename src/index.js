import { startServer } from './server.js';
import { initMongoConnection } from './db/initMongoDB.js';

export const bootstrap = async () => {
  await initMongoConnection();
  startServer();
};

bootstrap();
