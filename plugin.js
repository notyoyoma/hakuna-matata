"use strict";

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');


const resolveSpec = require('./resolveSpec');

const constantPrefix = 'HAKUNA_MATATA_API';

class HakunaMatataWebpackPlugin {
  constructor({
    configFile = 'hakuna-matata.config.json',
    alias = '$hm',
    expression = '@notyoyoma/hakuna-matata',
  } = {}) {

    const spec = resolveSpec(configFile);

    this.defineConstant = new DefinePlugin({
      [`${constantPrefix}_ALIAS`]: JSON.stringify(alias),
      [`${constantPrefix}_SPEC`]: JSON.stringify(spec),
    });
    this.provideClient = new ProvidePlugin({[alias]: expression});
  }

  apply(compiler) {
    this.defineConstant.apply(compiler);
    this.provideClient.apply(compiler);
  }
}

module.exports = HakunaMatataWebpackPlugin;