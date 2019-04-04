# hakuna-matata (WIP)

An API client that reads in OpenAPI specs, gives auto-complete hints in editors, writes test stubs, and asserts that your usage matches the OpenAPI spec.

Hakuna Matata. It means no worries.

### Future Features

1. API client
    1. Development mode - API client stored in non-committed JS files for code-completion
    2. Mock mode - API client only returns values from OpenAPI spec
```
    Input: OpenAPI spec
    Output: API client
```

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

### Current Features

1. This Readme
2. Thoughts and Prayers