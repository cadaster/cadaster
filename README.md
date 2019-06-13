# cadaster

> Geocoding and company

## :construction:

## Getting Started

### Installation

Following steps should derive to full development installation

```sh
# Clone this repo
git clone https://github.com/cadaster/cadaster

# Go to repo directory
cd cadaster

# Install root dependencies
npm install
```

This should trigger npm `postinstall` hook to resolve dependencies for node
packages w/ Lerna. To run this manually when needed run npm script `bootstrap`
which is an alias for

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
