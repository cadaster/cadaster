import test from 'ava'

import Adapter from '../src/adapter-geojson-fulltext'

// assets

const GEOJSON_DATA = require('./abcd.geo.json')

// macros

const assertScoredLocation = (t, sl) => {
  t.not(sl.location, undefined)
  t.not(sl.score, undefined)
}

const assertScoredLocationList = (t, sll) => {
  t.true(Array.isArray(sll), 'is array')

  for (const i in sll) {
    assertScoredLocation(t, sll[i])
  }
}

const assertResult = (t, result) => {
  assertScoredLocationList(t, result.members)
}

const assertResultSize = (t, result, size) => {
  const { members } = result

  assertScoredLocationList(t, members)
  t.is(members.length, size)
}

// tests

test('signature', async t => {
  t.is(typeof Adapter, 'function')

  const adapter = new Adapter({ data: GEOJSON_DATA })

  t.is(typeof adapter.search, 'function')

  const address = 'black forest'

  await adapter
    .search({ address })
    .then(result => {
      assertResult(t, result)
    })
})

test('config', async t => {
  const data = GEOJSON_DATA
  const address = 'black forest'

  await Adapter({ data })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 3)
    })

  await Adapter({ data, config: { threshold: 0.3 } })
    .search({ address })
    .then(result => {
      assertResultSize(t, result, 1)
    })
})
