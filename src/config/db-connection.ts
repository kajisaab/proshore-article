import { AppDataSource } from '@config/db.config';
import type { Server } from 'http';
import AppLogger from '@core/logger';
import config, { ConfigInterface } from '.';

const configDetails = config as ConfigInterface;

const logger = new AppLogger();
let RETRY_COUNT = 0;

async function dbConnection(server: Server): Promise<boolean> {
  try {
    const response = await AppDataSource.initialize();
    return response.isInitialized;
  } catch (err: unknown) {
    if (RETRY_COUNT < configDetails.db.retryCount) {
      logger.error(`Database connection failed. Retrying... ${err});`);
    }
    if (RETRY_COUNT >= configDetails.db.retryCount) {
      logger.error('Database connection failed after retrying');
      server.close(() => {
        process.exit();

      });
    }
    RETRY_COUNT++;
    await dbConnection(server);
    return false;
  }
}

export default dbConnection;
