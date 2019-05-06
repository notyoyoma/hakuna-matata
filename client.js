const OpenAPIClientAxios  = require('openapi-client-axios').default;

const definition = JSON.parse(HAKUNA_MATATA_API_SPEC);
const openApiLib = new OpenAPIClientAxios({definition, validate: false});
const client = openApiLib.init()

if (process.env.NODE_ENV !== 'production') {
  window[HAKUNA_MATATA_API_ALIAS] = client;
}

module.exports = client;