import test from 'ava'

import collection from '..'

test('features', t => {
  t.true(Array.isArray(collection.features))
})
