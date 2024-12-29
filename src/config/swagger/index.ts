import basicinfo from './basicinfo';
import servers from './servers';
import tags from './tags';
import { type Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import AppLogger from '@core/logger';
import components from './components';
import paths from './paths';

const docs = {
  ...basicinfo,
  ...servers,
  ...tags,
  ...components,
  security: [
    {
      'X-XSRF-TOKEN': []
    }
  ],
  ...paths
};

function swaggerDocs(app: Express, port: number): void {
  const logger = new AppLogger();
  app.use('/swagger-ui/docs', swaggerUi.serve, swaggerUi.setup(docs));

  logger.log(`Docs available at http://192.168.1.66:${port}/swagger-ui/docs`);
}

export default swaggerDocs;
