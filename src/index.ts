import http from 'http';
import 'module-alias/register';
import AppLogger from '@core/logger';
import dbConnection from '@config/db-connection';
import config from '@config/index';
import app from './app';

const logger = new AppLogger();

const server = http.createServer(app);

dbConnection(server)
  .then(async (res: boolean) => {
    logger.log('Successfully Database connected');
    if (res) {
      server.listen(config.port, (): void => {
        logger.log(`Server start at port ${config.port}`);
      });
    }
  })
  .catch((err) => {
    logger.error(err);
  });
