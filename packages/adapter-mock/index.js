const Fuse = require('fuse.js')

const R = require('ramda')
const T = require('@cadaster/types')

// Standard config

const FUSE_CONFIG_DEFAULT = {
  shouldSort: true,
  includeScore: true,
  includeMatches: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 3,
  keys: [
    'properties.name',
    'properties.label'
  ]
}

// helpers

/**
 * Safely get `features` array from given `Context`
 *
 * @param {Context} ctx
 *
 * @return {Array<Feature>}
 */

const featuresFrom = R.propOr([], 'features')

/**
 * Safely get `config` object from given `Context`
 *
 * @param {Context} ctx
 *
 * @return {Config}
 */

const configFrom = R.compose(
  R.mergeDeepRight(FUSE_CONFIG_DEFAULT),
  R.propOr({}, 'config')
)

/**
 * Convert a match from index lookup to `ScoredLocation`
 *
 * @param {Object} match
 *
 * @returns {Object} - members
 */

const featureFromMatch = body => {
  const { item, score } = body

  const geometry = T.Geometry.fromFeature(item)
  const properties = R.merge(body.properties, { score })

  return T.Feature.Feature(geometry, properties)
}

// methods

function search (ctx, query) {
  const { features, config } = ctx

  // Index
  const idx = new Fuse(features, config)

  const { address } = query
  const hits = idx
    .search(address)
    .map(featureFromMatch)

  return Promise
    .resolve(hits)
    .then(T.FeatureCollection.FeatureCollection)
}

// class constructor

class _Adapter {
  constructor (opts = {}) {
    this.features = featuresFrom(opts)
    this.config = configFrom(opts)
  }

  search (query) {
    return search(this, query)
  }
}

// constructor

function Adapter (data, config) {
  return new _Adapter(data, config)
}

module.exports = Adapter
