# hakuna-matata (WIP)

An API client that reads in OpenAPI specs, gives auto-complete hints in editors, writes test stubs, and asserts that your usage matches the OpenAPI spec.

Hakuna Matata. It means no worries.

## Installation and configuration

1. Install
```
npm install --save @notyoyoma/hakuna-matata
```

2. Add plugin to webpack.conf.js
webpack-config.js

```
const HakunaMatata = require('@notyoyoma/hakuna-matata/plugin').default;
{
  ...
  plugins: [
    ...
    new HakunaMatata({
      configFile: 'hakuna-matata.config.json',
      alias: '$hm',
      expression: '@notyoyoma/hakuna-matata',
    }),
  ]
}
```
All of the parameters for `HakunaMatata()` are optional.


| param | useage |
| --- | --- |
| configFile | Name of the config file that stores the swagger.json locations |
| alias | Name of the global variable |
| expression | Location to require hakuna-matata from |

3. Create `./hakuna-matata.config.json` in the root of your project.
```
[
  {
    "gitBranch": "master",
    "url": "https://example.com/production-api-spec.json",
  },
  {
    "nodeEnv": "production",
    "gitBranch": "staging",
    "url": "https://example.com/staging-api-spec.json",
  },
  {
    "url": "https://example.com/default-api-spec.json",
  }
]
```

Hakuna Matata will use the first object that matches all provided parameters. A default can be set by not providing any parameters. (see above) If you you don't create a `hakuna-matata.config.json` correctly, it will fall back to [Pet Store](https://petstore.swagger.io/v2/swagger.json) (while WIP). Available matching parameters are:

| key | examples | |
| --- | --- | --- |
| gitBranch | `master`, `develop`, `feat/ApiV2` | Config will only be selected if matching branch is currently checked out. This is useful when using separate APIs between servers. |
| nodeEnv | `production`, `develop` | Config will only be selected if matches `process.env.NODE_ENV`. This is useful when using a separate API for development. |


## Usage

Hakuna Matata uses webpack plugin framework (not currently working) to create a global variable containing the API Client.

### Future Features

1. API client
    1. Mock mode - API client only returns example values from OpenAPI spec (for unit-testing)
    2. Unit-testing mode - tests all calls against OpenAPI spec, and pass/fails based on adherence

2. Output global.d.ts with full API client usage for vscode autocomplete.
    1. Output just method names (for autocomplete)
    2. Output method descriptions
    3. Output method parameters
    4. Trigger ESLint for improper use

3. Test stub generation
```
  Input: OpenAPI spec, tags
  Output: Generate test stubs with API mocking
```

4. Live API health-check (for deployments)

5. API client usage tests
```
  Input: Usage of hakuna-matata API client in tests
  Output: Assert that usage matched OpenAPI spec
```
