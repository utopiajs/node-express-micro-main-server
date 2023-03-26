const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
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
      url: `http://localhost:${config.port}/v1`
    }
  ]
};

module.exports = swaggerDef;
