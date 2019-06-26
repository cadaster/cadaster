import test from 'ava'

import { AssertionError } from 'assert'

import create from '../src/Adapter'

test('sources', t => {
  t.notThrows(() => create('addok'))
  t.notThrows(() => create('esri'))
  t.notThrows(() => create('geojson-fulltext'))
  t.notThrows(() => create('opencage'))

  t.throws(() => create(), AssertionError, 'undefined source')
  t.throws(() => create('mapbox'), RangeError, 'unknown source')
})
