const createAdapter = require('./Adapter')

class Geocoder {
  constructor (source, opts = {}) {
    this.adapter = createAdapter(source, opts)
  }
  search (query) {
    return this.adapter.search(query)
  }
}

module.exports = Geocoder
