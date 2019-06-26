# :package: Adapter GeoJSON (full-text)

An geocoding adapter with reusable API

## Getting Started

### Installation

```sh
npm install @cadaster/adapter-geojson-fulltext
```

### Usage

```js
const Adapter = require('@cadaster/adapter-geojson-fulltext')

const data = require('./data.geojson')

const adapter = new Adapter({ data })

adapter
  .search('an address line')
  .then(console.log)
```
