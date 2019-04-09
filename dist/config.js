const fs = require('fs');
const path = require('path');
const envGitBranch = require('git-branch');
const syncRequest = require('sync-request');

const CONFIG_FILE = "hakuna-matata.config.json";

const defaultConfig = {
  url: 'https://petstore.swagger.io/v2/swagger.json'
};

async function getEnvGitBranch() {
  return await envGitBranch();
}

const gitBranch = getEnvGitBranch();
const nodeEnv = process.env.NODE_ENV;

const rootDir = process.env.NODE_PATH || process.cwd();

let configFile;
try {
  configFile = JSON.parse(fs.readFileSync(path.join(rootDir, CONFIG_FILE)));
} catch (error) {
  configFile = [];
  console.log('./hakuna-matata.config.json not found. Continuing with example configuration');
}

configFile.push(defaultConfig);

let config;
for (let conf of configFile) {
  if (
    (conf.gitBranch === undefined || conf.gitBranch === gitBranch)
    &&
    (conf.nodeEnv === undefined || conf.nodeEnv === nodeEnv)
  ) {
    config = conf;
    delete config['gitBranch']
    delete config['nodeEnv']
    break;
  }
}

const spec = syncRequest('GET', config.url).getBody().toString('utf8');
exports.spec = spec;
exports.default = config;
