import test from 'ava'

import { FeatureCollection } from '@cadaster/types'

import Adapter from '..'

const ADDRESS_LINE = '8 bd du port'

// macros

const assertResult = (t, result) => {
  t.true(FeatureCollection.prototype.isPrototypeOf(result))
}

// tests

test('spec', t => {
  t.is(typeof Adapter, 'function')
})

test('search', async t => {
  const provider = Adapter({})

  const address = ADDRESS_LINE

  await provider
    .search({ address })
    .then(result => {
      assertResult(t, result)
    })
})

// next
test.todo('reverse search')
