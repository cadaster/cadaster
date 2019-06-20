import test from 'ava'

import types from '..'

test('members', t => {
  t.not(types.FeatureCollection)
  t.not(types.Feature)
  t.not(types.Geometry)
  t.not(types.Position)
})
