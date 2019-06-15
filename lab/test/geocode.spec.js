import test from 'ava'

import geocode from '../src/geocode'

// assets

const ADDRESS_OK = 'exo, Hudson, Canada'
const POSITION_OK = [ -74.140602, 45.459373 ]

// tests

test('signature', t => {
  t.is(typeof geocode, 'function')
})

test('optimistic case', t => {
  const dict = {
    [ADDRESS_OK]: POSITION_OK
  }

  t.deepEqual(geocode(dict, ADDRESS_OK), POSITION_OK)
})
