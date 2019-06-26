import test from 'ava'

import { Geocoder } from '..'

test('signature', t => {
  const geocoder = new Geocoder('mock')
  t.true(geocoder instanceof Geocoder, 'is a constructor')

  t.is(typeof geocoder.search, 'function', 'has `search` method')
})

test('optimistic case', async t => {
  const geocoder = new Geocoder('mock')

  await geocoder
    .search('rue')
    .then(({ features }) => {
      t.true(Array.isArray(features))
    })
})
