import test from 'ava'

import geocode from '../src/geocode'

// assets

const DICT = geocode.ADDRESSES

const [ ADDRESS_OK ] = Object.keys(DICT)
const [ POSITION_OK ] = Object.values(DICT)

const ADDRESS_UNKNOWN = 'Exo, Bogatynia, Poland'

// hypothetic cases

/**
 * Show result as string
 *
 * @returns {String} - Info on position or 'Unknown'
 */

const stringify = address => {
  // @sig :: [Number, Number] -> String
  const toText = ([ long, lat ]) =>
    `(${long},${lat})`

  const position = geocode(address)

  if (!position) {
    return 'Unknown'
  }

  return toText(position)
}

// tests

test.serial('optimistic cases', t => {
  const [ long, lat ] = POSITION_OK
  t.is(stringify(ADDRESS_OK), `(${long},${lat})`)

  t.notThrows(() => stringify(ADDRESS_UNKNOWN))
  t.is(stringify(ADDRESS_UNKNOWN), 'Unknown')
})

// more realistic usage

test.serial('ok/unknown case separation', t => {
  const safeStringify = address => {
    const res = stringify(address)

    if (res === 'Unknown') {
      throw new Error('Unknown')
    }

    return res
  }

  t.notThrows(() => safeStringify(ADDRESS_OK))
  t.throws(() => safeStringify(ADDRESS_UNKNOWN))
})

// known issues

test.serial.failing('input validation', t => {
  const badInput = [ ADDRESS_OK, ADDRESS_UNKNOWN ]

  t.throws(() => stringify(badInput), TypeError)
})

test.serial.failing('result validation (mutate state)', t => {
  // mutate state
  // XXX: in real world could be done somewhere else
  DICT[ADDRESS_UNKNOWN] = '14.972302,50.899355'

  t.throws(() => stringify(ADDRESS_UNKNOWN), TypeError)
})

test.failing('initial test after mutation', t => {
  t.is(stringify(ADDRESS_UNKNOWN), 'Unknown')
})
