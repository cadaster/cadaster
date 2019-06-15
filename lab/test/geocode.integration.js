import test from 'ava'

import geocode from '../src/geocode'

// assets

const ADDRESS = 'exo, Hudson, Canada'
const ADDRESS_OTHER = 'Exo, Bogatynia, Poland'

const POSITION_OK = [ -74.140602, 45.459373 ]
const POSITION_INVALID = [ '-70\'14', '45\'45' ]

// hypothetic cases

/**
 * Show result as string
 *
 * @returns {String} - Info on position or 'Unknown'
 */

const reportFrom = (dict) => (address) => {
  // @sig :: [Number, Number] -> String
  const toText = ([ long, lat ]) =>
    `(${long},${lat})`

  const position = geocode(dict, address)

  if (!position) {
    return 'Unknown'
  }

  return toText(position)
}

// tests

test.serial('optimistic cases', t => {
  const stringify = reportFrom({
    [ADDRESS]: POSITION_OK
  })

  const [ long, lat ] = POSITION_OK
  t.is(stringify(ADDRESS), `(${long},${lat})`)

  t.notThrows(() => stringify(ADDRESS_OTHER))
  t.is(stringify(ADDRESS_OTHER), 'Unknown')
})

// more realistic usage

test.serial('ok/unknown case separation', t => {
  const stringify = reportFrom({
    [ADDRESS]: POSITION_OK
  })

  const safeStringify = address => {
    const res = stringify(address)

    if (res === 'Unknown') {
      throw new Error('Unknown')
    }

    return res
  }

  t.notThrows(() => safeStringify(ADDRESS))
  t.throws(() => safeStringify(ADDRESS_OTHER))
})

// known issues

test.serial.failing('input validation', t => {
  const stringify = reportFrom({})

  const badInput = [ ADDRESS, ADDRESS_OTHER ]

  t.throws(() => stringify(badInput), TypeError)
})

test.serial.failing('result validation', t => {
  const stringify = reportFrom({
    [ADDRESS]: POSITION_INVALID
  })

  t.throws(() => stringify(ADDRESS), TypeError)
})
