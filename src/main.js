const Swagger = require('swagger-client');
const config = require('./config.js').default;

/* Inject during compile time with webpack 
 * {
 *   ...
 *   plugins: [
 *     ...
 *     new webpack.DefinePlugin({
 *       HK_OPEN_API_SPEC
 *     }),
 *   ]
 * }
 */
const spec = HK_OPEN_API_SPEC || false;

global.hk = Swagger({spec}).client;
