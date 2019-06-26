import test from 'ava'

import Adapter from '..'

import * as T from '@cadaster/types'

// assets

const { features } = require('@cadaster/mock-features-distinct-places')

// macros

const assertResult = (t, result) => {
  t.true(T.FeatureCollection.prototype.isPrototypeOf(result))
}

const assertResultSize = (t, result, size) => {
  t.is(result.features.length, size)
}

// tests

test('signature', async t => {
  t.is(typeof Adapter, 'function')

  const adapter = new Adapter({ features })

  t.is(typeof adapter.search, 'function')

  const address = 'black forest'

  await adapter
    .search({ address })
    .then(result => {
      assertResult(t, result)
    })
})

test('config', async t => {
  const address = 'black forest'

  await Adapter({ features })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 3)
    })

  await Adapter({ features, config: { threshold: 0.3 } })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 1)
    })
})
