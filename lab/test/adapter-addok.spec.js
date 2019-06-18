import test from 'ava'

import Adapter from '../src/adapter-addok'

const HOST = 'https://api-adresse.data.gouv.fr'
const ADDRESS_LINE = '8 bd du port'

test('spec', t => {
  t.is(typeof Adapter, 'function')
})

test('search', async t => {
  const provider = Adapter({ host: HOST })

  const address = ADDRESS_LINE

  await provider
    .search({ address })
    .then(result => {
      t.true(Array.isArray(result.features))
    })
})

// next
test.todo('reverse')
