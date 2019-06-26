const client = require('opencage-api-client')

const R = require('ramda')
const T = require('@cadaster/types')

// helpers

function recover (body) {
  const { Feature } = T.Feature
  const { FeatureCollection } = T.FeatureCollection

  const featureFrom = result => {
    const properties = R.pick(['label', 'score'], result)

    const { lat, lng } = result.geometry
    const geometry = T.Geometry.Point([lng, lat])

    return Feature(geometry, properties)
  }

  const pipe = R.compose(
    FeatureCollection,
    R.map(featureFrom),
    R.prop('results')
  )

  return pipe(body)
}

// methods

/**
 * Forward geocoding search
 *
 * @param {Object} ctx
 * @param {string} ctx.apiKey
 * @param {Object} query
 * @param {string} query.address
 *
 * @return {Promise<GeoJSON.FeatureCollection>}
 */

function search (ctx, query) {
  return client
    .geocode({ key: ctx.apiKey, q: query.address })
    .then(recover)
}

/**
 * Adapter class constructor for OpenCage Data API
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {string} opts.apiKey
 *
 * @return {Adapter}
 */

class _Adapter {
  constructor (opts = {}) {
    this.apiKey = opts.apiKey
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
