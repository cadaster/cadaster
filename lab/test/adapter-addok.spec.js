import test from 'ava'

import Adapter from '../src/adapter-addok'

const HOST = 'https://api-adresse.data.gouv.fr'
const ADDRESS_LINE = '8 bd du port'

// macros

const assertScoredFeature = (t, pair) => {
  t.not(pair.feature, undefined)
  t.not(pair.score, undefined)
}

const assertScoredLocationList = (t, list) => {
  t.true(Array.isArray(list), 'is array')

  for (const i in list) {
    assertScoredFeature(t, list[i])
  }
}

const assertResult = (t, result) => {
  assertScoredLocationList(t, result.features)
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
