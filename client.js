const Swagger = require('swagger-client');

const spec = JSON.parse(HAKUNA_MATATA_API_SPEC);
const openApiLib = Swagger({spec});
const client = openApiLib.client;

if (process.env.NODE_ENV !== 'production') {
  global[HAKUNA_MATATA_API_ALIAS] = client;
}

module.exports = client;