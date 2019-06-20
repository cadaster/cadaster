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

const dataFrom = R.pathOr([], ['data', 'features'])

/**
 * Safely get `config` object from given `Context`
 *
 * @param {Context} ctx
 *
 * @return {Config}
 */

const configFrom = R.compose(
  R.mergeRight(FUSE_CONFIG_DEFAULT),
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
  const data = dataFrom(ctx)
  const config = configFrom(ctx)

  const { address } = query

  // Index
  const idx = new Fuse(data, config)

  const features = idx
    .search(address)
    .map(featureFromMatch)

  return Promise
    .resolve(features)
    .then(T.FeatureCollection.FeatureCollection)
}

// class constructor

class _Adapter {
  constructor (opts) {
    this.config = opts.config
    this.data = opts.data
  }

  search (query) {
    return search(this, query)
  }
}

// constructor

function Adapter (opts) {
  return new _Adapter(opts)
}

module.exports = Adapter
