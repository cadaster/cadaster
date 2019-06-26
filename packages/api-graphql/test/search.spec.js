import test from 'ava'

import { createTestClient } from 'apollo-server-testing'

import AdapterAddok from '@cadaster/adapter-addok'

import createServer from '..'

import Client from '../client'

//

// helpers

// hooks

test.beforeEach(async t => {
  const adapter = AdapterAddok()

  const server = createServer({ adapter })
  const client = createTestClient(server)

  t.context = {
    client,
    server
  }
})

// tests

test('optimistic', async t => {
  const { client } = t.context

  const input = { address: 'rue' }

  const checkResponse = res => {
    console.log(JSON.stringify(res, null, 2))
    t.pass()
  }

  return Client
    .search(client, input)
    .then(checkResponse)
})
