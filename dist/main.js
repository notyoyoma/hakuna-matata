const Swagger = require('swagger-client');

const spec = HK_OPEN_API_SPEC;
const swaggerPromise = Swagger({spec}).then((client) => global.hk = client);

//let HakunaMatata = (path, params={}, config={}) => swaggerPromise.then((client) => {
//  const errFn = () => console.log(`API: ${path} does not exist`);
//  return _.get(client, ['apis', ...path], errFn)(params, config);
//});
