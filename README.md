# cadaster

> Geocoding and company

## :construction:

## Getting Started

### Installation

Following steps should derive to full development installation

- clone this repo
- go to the root of repo directory
- install root dependencies

```sh
# Install root dependencies
npm install
```

This install step should trigger npm `postinstall` hook to resolve dependencies 
for node packages w/ Lerna. To run this manually when needed run npm script 
`bootstrap` which is an alias for

```
lerna bootstrap --hoist
```

### Tests

Packages should provide tests to ensure correct behavior. 

Run tests in package directory

```sh
# run quick tests
npm run test

# test with coverage report
npm run test:coverage

# test watching file changes
npm run test:watch
```

### NPM Scripts

> Commands

- `lint`
- `test`
- `test:coverage`

> Hooks

- `postinstall` - `lerna bootstrap`

### License

[MIT](/LICENSE)
