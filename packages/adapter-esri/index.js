require('isomorphic-fetch')
require('isomorphic-form-data')

const { geocode } = require('@esri/arcgis-rest-geocoder')

const R = require('ramda')
const T = require('@cadaster/types')

// settings

const HOST = 'https://api-adresse.data.gouv.fr'

// helpers

function recover (body) {
  const { Feature } = T.Feature
  const { FeatureCollection } = T.FeatureCollection

  const featureFrom = item => {
    const { x, y } = item.location

    const [ label, score ] = R.props(['address', 'score'], item)
    const geometry = T.Geometry.Point([ x, y ])

    return Feature(geometry, { label, score })
  }

  const pipe = R.compose(
    FeatureCollection,
    R.map(featureFrom),
    R.prop('candidates')
  )

  return pipe(body)
}

// methods

/**
 * Forward geocoding search
 *
 * @param {Object} ctx
 * @param {Object} query
 * @param {string} query.address
 *
 * @return {Promise<GeoJSON.FeatureCollection>}
 */

function search (ctx, query) {
  return geocode(query.address)
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
  constructor (opts = {}) {
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
