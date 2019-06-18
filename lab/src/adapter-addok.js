const got = require('got')

// settings

const HOST = 'https://api-adresse.data.gouv.fr'

// helpers

const recover = response => {
  const asPair = feature => {
    const { score } = feature.properties
    return { feature, score }
  }

  const features = response.features
    .map(asPair)

  return { features }
}

// methods

/**
 * Forward geocoding search
 *
 * @param {Object} ctx
 * @param {string} ctx.host
 * @param {Object} query
 * @param {string} query.address
 *
 * @return {Promise<GeoJSON.FeatureCollection>}
 */

function search (ctx, query) {
  const url = `${ctx.host}/search?q=${query.address}`

  return got(url, { json: true })
    .then(res => res.body)
    .then(recover)
}

/**
 * Adapter class constructor for Etalab Addok
 *
 * @constructor
 *
 * @param {Object} conf
 * @param {string} [conf.host = ]
 *
 * @return {Provider}
 */

class _Adapter {
  constructor (opts) {
    this.host = opts.host || HOST
  }

  search (query) {
    return search(this, query)
  }
}

function Adapter (opts) {
  return new _Adapter(opts)
}

// Expose constructor

module.exports = Adapter
