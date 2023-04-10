const { version } = require('../../package.json');
const config = require('../config/config');
const { API_PREFIX, API_VERSION } = require('../constants/index');

const swaggerDef = {
  openapi: '3.0.0',
  basePath: `${API_PREFIX}/${API_VERSION}`,
  info: {
    title: 'node-express-micro-main API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/utopiajs/node-express-micro-main-server/blob/main/LICENSE'
    }
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/micro-main/v1`
    }
  ]
};

module.exports = swaggerDef;
