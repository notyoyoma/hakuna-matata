const resolveSpec = require('./resolveSpec').resolveSpec;
const Swagger = require('swagger-client');

let client;

exports.initClient = function({configFile}) {
  const spec = resolveSpec({configFile});
  const openApiLib = Swagger({spec});
  client = openApiLib.client;
  return client;
}

exports.client = client;