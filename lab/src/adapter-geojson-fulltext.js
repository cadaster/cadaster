const Fuse = require('fuse.js')

const R = require('ramda')

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

const memberFromMatch = R.applySpec({
  location: R.prop('item'),
  score: R.prop('score')
})

// methods

function search (ctx, query) {
  const data = dataFrom(ctx)
  const config = configFrom(ctx)

  const { address } = query

  // Index
  const idx = new Fuse(data, config)

  const members = idx
    .search(address)
    .map(memberFromMatch)

  return Promise
    .resolve({ members })
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
