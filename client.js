const OpenAPIClientAxios  = require('openapi-client-axios').default;

const definition = JSON.parse(HAKUNA_MATATA_API_SPEC);
const openApiLib = new OpenAPIClientAxios({definition, validate: false});

async function getApiClient() {
  return await openApiLib.init();
}
const client = getApiClient().client;

if (process.env.NODE_ENV !== 'production') {
  global[HAKUNA_MATATA_API_ALIAS] = openApiLib.client;
}

module.exports = client;