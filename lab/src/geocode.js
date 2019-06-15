/**
 * Naive geocoding method
 *
 * Use provided data source
 *
 * @sig :: Source -> String -> Undefined | [Number, Number]
 *
 * @param {Source} source - data source
 * @param {string} address - key to lookup
 * @returns {Array} - long/lat coordinates pair
 */

function geocode (source, address) {
  return source.get(address)
}

// Expose

module.exports = geocode
