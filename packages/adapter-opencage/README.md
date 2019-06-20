# :package: OpenCage API Adapter

### Install

```sh
npm install @cadaster/adapter-opencage
```

### Usage

```js
const Adapter = require('@cadaster/adapter-opencage')

const apiKey = 'XXX'

Adapter({ apiKey })
  .search({ address: 'magnifique' })
  .then(console.log)
```
