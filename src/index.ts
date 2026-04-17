import dotenv from 'dotenv';
dotenv.config();

import HttpServer from '@/api/http';
import SocketServer from '@/api/socket';
import Database from '@/database';

import Logger from '@/logger';

(async () => {
  new Logger('SERVER').info('--------------------------------');
  await HttpServer.setup();
  new Logger('SERVER').info('--------------------------------');
  await SocketServer.setup(HttpServer.server);
  new Logger('SERVER').info('--------------------------------');
  await Database.setup();
  new Logger('SERVER').info('--------------------------------');
})();

process.on('uncaughtException', (error: Error) => {
  new Logger('SERVER').error(`Uncaught exception: ${error.message}`);
});

process.on('unhandledRejection', (error: Error) => {
  new Logger('SERVER').error(`Unhandled rejection: ${error.message}`);
});
