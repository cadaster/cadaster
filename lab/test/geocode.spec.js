import test from 'ava'

import geocode from '../src/geocode'

// assets

const DICT = geocode.ADDRESSES

const [ ADDRESS_OK ] = Object.keys(DICT)
const [ POSITION_OK ] = Object.values(DICT)

// tests

test('signature', t => {
  t.is(typeof geocode, 'function')
})

test('optimistic case', t => {
  t.deepEqual(geocode(ADDRESS_OK), POSITION_OK)
})
