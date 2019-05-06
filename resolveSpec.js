const fs = require('fs');
const path = require('path');
const envGitBranch = require('git-branch');
const parse = require('url-parse');

const gitBranch = (async () => await envGitBranch())();
const nodeEnv = process.env.NODE_ENV;
const rootDir = process.env.NODE_PATH || process.cwd();

function resolveSpec(configFile) {

  // Build a list of possible configs from 
  let configs;
  try {
    configFilePath = path.join(rootDir, configFile);
    console.log(configFilePath);
    configs = JSON.parse(fs.readFileSync(configFilePath));
  } catch (error) {
    configs = [{url: 'https://petstore3.swagger.io/api/v3/openapi.json'}];
    console.log('./hakuna-matata.config.json not found. Continuing with petstore json');
  }

  // Find the first config that matches the current environment
  let config;
  for (let conf of configs) {
    if (
      (conf.gitBranch === undefined || conf.gitBranch === gitBranch)
      &&
      (conf.nodeEnv === undefined || conf.nodeEnv === nodeEnv)
    ) {
      config = conf;
      break;
    }
  }

  const url = config.url;

  // Get the spec from the configured URL / file
  let spec;
  if (/^https?:\/\//.test(url)) {
    const syncRequest = require('sync-request');
    console.log("Performing syncronous call. If you see this in the browser, check your hakuna-matata config");
    spec = syncRequest('GET', url).getBody().toString('utf8');
    spec = JSON.parse(spec);
  } else {
    spec = require(url);
  }

  return {spec, url};
}

module.exports = resolveSpec;