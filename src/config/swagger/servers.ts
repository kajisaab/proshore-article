import config from '..';

export default {
  servers: [
    {
      url: `http://localhost:${config.port}/v1/api/`,
      description: 'Local server'
    }
  ]
};
