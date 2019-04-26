const fs = require('fs');
const path = require('path');
const envGitBranch = require('git-branch');

const gitBranch = (async () => await envGitBranch())();
const nodeEnv = process.env.NODE_ENV;
const rootDir = process.env.NODE_PATH || process.cwd();

exports.resolveSpec = function({url, configFile}) {

  // Build a list of possible configs from 
  let configs;
  try {
    configFilePath = path.join(rootDir, configFile);
    console.log(configFilePath);
    configs = JSON.parse(fs.readFileSync(configFilePath));
  } catch (error) {
    configs = [{url: 'https://petstore.swagger.io/v2/swagger.json'}];
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

  // Get the spec from the configured URL / file
  let spec;
  if (/^https?:\/\//.test(config.url)) {
    const syncRequest = require('sync-request');
    console.log("Performing syncronous call. If you see this in the browser, check your hakuna-matata config");
    spec = syncRequest('GET', config.url).getBody().toString('utf8');
  } else {
    spec = require(config.url);
  }

  return spec;
}
