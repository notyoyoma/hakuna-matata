"use strict";

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');


const resolveSpec = require('./resolveSpec');
const typegen = require('./typegen');

const constantPrefix = 'HAKUNA_MATATA_API';

class HakunaMatataWebpackPlugin {
  constructor({
    configFile = 'hakuna-matata.config.json',
    alias = '$hm',
    expression = '@notyoyoma/hakuna-matata',
    typesFile = 'globals.d.ts'
  } = {}) {

    const {spec, url} = resolveSpec(configFile);

    this.defineConstant = new DefinePlugin({
      [`${constantPrefix}_ALIAS`]: JSON.stringify(alias),
      [`${constantPrefix}_SPEC`]: JSON.stringify(spec),
    });
    this.provideClient = new ProvidePlugin({[alias]: expression});

    
    typegen({typesFile, spec, alias});
  }

  apply(compiler) {
    this.defineConstant.apply(compiler);
    this.provideClient.apply(compiler);
  }
}

module.exports = HakunaMatataWebpackPlugin;