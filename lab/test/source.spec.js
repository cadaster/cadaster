import test from 'ava'

import Source from '../src/Source'

// assets

const ADDRESS_OK = 'exo, Hudson, Canada'
const POSITION_OK = [ -74.140602, 45.459373 ]

const ADDRESS_OTHER = 'Exo, Bogatynia, Poland'

// tests

test('signature', t => {
  t.is(typeof Source, 'function')
})

test('optimistic case', t => {
  const dict = {
    [ADDRESS_OK]: POSITION_OK
  }

  const source = Source({ dict })

  t.is(source.get(ADDRESS_OTHER), undefined)
  t.deepEqual(source.get(ADDRESS_OK), POSITION_OK)
})
