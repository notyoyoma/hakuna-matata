"use strict";

const NullFactory = require('webpack/lib/NullFactory');
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const ParserHelpers = require('webpack/lib/ParserHelpers');

const Swagger = require('swagger-client');
const resolveSpec = require('./resolveSpec').resolveSpec;

let client;

class HakunaMatata {
  constructor({
    configFile = 'hakuna-matata.config.json',
    alias = '$hm',
    expression = 'hakuna-matata',
  } = {}) {
    this.alias = alias;
    this.expression = expression;
    this.init({configFile});
  }

  init({configFile}) {
    const spec = resolveSpec({configFile});
    this.spec = spec;
    this.openApiClient = Swagger({spec});
    this.client = this.openApiClient;
  }

  bindGlobalForDevelopMode(mode) {
    if (mode !== "production") {
      global[this.alias] = this.client;
    }
  }

  apply(compiler) {
    this.bindGlobalForDevelopMode(compiler.options.mode);
    compiler.hooks.compilation.tap(
      "HakunaMatata",
      (compilation, { normalModuleFactory }) => {
        compilation.dependencyFactories.set(ConstDependency, new NullFactory());
        compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);
        const handler = (parser, parserOptions) => {
          parser.hooks.expression.for(this.alias).tap("HakunaMatata", expr => {
            const expression = `require(${JSON.stringify(this.expression)}).client`;
            return !ParserHelpers.addParsedVariableToModule(parser, this.alias, expression);
          });
        };
        normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("ProvidePlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("ProvidePlugin", handler);
      }
    );
  }
}

exports.client = client;

exports.default = HakunaMatata;