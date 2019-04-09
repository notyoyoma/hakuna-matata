# hakuna-matata (WIP)

An API client that reads in OpenAPI specs, gives auto-complete hints in editors, writes test stubs, and asserts that your usage matches the OpenAPI spec.

Hakuna Matata. It means no worries.

## Installation

1. Install
```
npm install --save hakuna-matata
```

2. Add plugin to webpack
webpack-config.js

```
{
  ...
  plugins: [
    ...
    new webpack.DefinePlugin({
      HK_OPEN_API_SPEC: require('hakuna-matata/src/spec.js').spec
    }),
  ]
}
```

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

Hakuna Matata will use the first object that matches. If you you don't configure `hakuna-matata.config.json` correctly, it will fall back to [Pet Store](https://petstore.swagger.io/v2/swagger.json). Available matching options are:

| key | examples | |
| --- | --- | --- |
| gitBranch | `master`, `develop`, `feat/ApiV2` | Config will only be selected if matching branch is currently checked out. This is useful when using separate APIs between servers. |
| nodeEnv | `production`, `develop` | Config will only be selected if matches `process.env.NODE_ENV`. This is useful when using a separate API for development. |


### Future Features

1. API client
    1. Development mode - API client stored in non-committed JS files for code-completion
    2. Mock mode - API client only returns values from OpenAPI spec

2. Automated test stub generation
```
    Input: OpenAPI spec, tags
    Output: Generate test stubs with API mocking
```

3. API client usage tests
```
    Input: Usage of hakuna-matata API client in tests
    Output: Assert that usage matched OpenAPI spec
```
