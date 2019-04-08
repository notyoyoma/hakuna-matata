const config = require('./config.js').default;
const Swagger = require('swagger-client');


const swaggerPromise = Swagger(config.url);

const HakunaMatata = (path, params={}, config={}) => swaggerPromise.then((client) => {
  const errFn = () => console.log(`API: ${path} does not exist`);
  return _.get(client, ['apis', ...path], errFn)(params, config);
});

export.default HakunaMatata;
