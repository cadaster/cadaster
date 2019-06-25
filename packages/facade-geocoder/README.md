# :package: facade-geocoder

Configured facade for business logic

## Getting Started

### Installation

```sh
npm install @cadaster/facade-geocoder
```

### Usage

```js
const Geocoder = require('@cadaster/geocoder')

const geocoder = new Geocoder({ source: 'addok' })

geocoder
  .search({ address: 'red bank, England' })
  .then(console.log)
```
