/**
 * Naive geocoding method
 *
 * Using dictionary lookup on exact match
 *
 * @sig :: Object -> String -> Undefined | [Number, Number]
 *
 * @param {Object} dict - key-value data source
 * @param {string} address - key to lookup
 * @returns {Array} - long/lat coordinates pair
 */

function geocode (dict, address) {
  return dict[address]
}

// Expose

module.exports = geocode
