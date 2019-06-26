# :package: Adapter Mock 

An geocoding adapter for GeoJSON (full-text)

## Getting Started

### Installation

```sh
npm install @cadaster/adapter-mock
```

### Usage

```js
const Adapter = require('@cadaster/adapter-mock')

const { features } = require('./feature-collection.geojson')

const adapter = new Adapter({ features })

adapter
  .search('an address line')
  .then(console.log)
```
