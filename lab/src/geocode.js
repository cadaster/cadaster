// Address dictionary
const ADDRESSES = {
  'exo, Hudson, Canada': [ -74.140602, 45.459373 ],
  'EXO, Karlsruhe, Germany': [ 8.402304, 49.000396 ]
}

/**
 * Naive geocoding method
 *
 * Using dictionary lookup on exact match
 *
 * @sig :: String -> Undefined | [Number, Number]
 *
 * @param {string} address
 * @returns {Array} - long/lat coordinates pair
 */

function geocode (address) {
  return ADDRESSES[address]
}

// Expose

module.exports = geocode

module.exports.ADDRESSES = ADDRESSES
