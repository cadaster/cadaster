const got = require('got')

const R = require('ramda')
const M = require('../src/types')

// settings

const HOST = 'https://api-adresse.data.gouv.fr'

// helpers

function recover (body) {
  const pipe = R.compose(
    M.FeatureCollection.FeatureCollection,
    R.map(M.Feature.from),
    R.prop('features')
  )

  return pipe(body)
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
 * @param {string} conf.host
 *
 * @return {Adapter}
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
