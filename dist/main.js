const Swagger = require('swagger-client');

const spec = HK_OPEN_API_SPEC;
global.hk = Swagger({spec}).client;
