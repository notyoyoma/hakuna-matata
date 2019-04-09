const syncRequest = require('sync-request');

const config = require('./config.js').default;

console.log("Performing syncronous call. If you see this in the browser, check your hakuna-matata config");
const spec = syncRequest('GET', config.url).getBody().toString('utf8');

/*
 * Exports a string containing the JSON from the swagger file.
 * Store this in a global constant during compile.
 */
exports.default = spec;

