const assert = require('assert')

function main (source, options = {}) {
  // source must be present
  assert(source)

  const adapterLocator = `@cadaster/adapter-${source}`

  try {
    const Adapter = require(adapterLocator)
    return new Adapter(options)
  } catch (err) {
    throw new RangeError(err.message)
  }
}

module.exports = main
