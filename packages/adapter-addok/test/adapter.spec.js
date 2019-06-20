import test from 'ava'

import { FeatureCollection } from '@cadaster/types'

import Adapter from '..'

const HOST = 'https://api-adresse.data.gouv.fr'
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
  const provider = Adapter({ host: HOST })

  const address = ADDRESS_LINE

  await provider
    .search({ address })
    .then(result => {
      assertResult(t, result)
    })
})

// next
test.todo('reverse search')
