# :package: mock-features-distinct-places

Hand-made list of places formatted as GeoJSON features.

## Getting Started

### Installation

```sh
npm install @cadaster/mock-features-distinct-places
```

### Usage

```js
const Adapter = require('@cadaster/adapter-mock')
const { features } = require('@cadaster/mock-features-distinct-places')

new Adapter({ features })
  .search('black road')
  .then(console.log)
```
