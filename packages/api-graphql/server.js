const AddokAdapter = require('@cadaster/adapter-addok')
const ESRIAdapter = require('@cadaster/adapter-esri')

const createServer = require('.')

// assets

const adapters = {
  addok: AddokAdapter({}),
  esri: ESRIAdapter({})
}

const server = createServer({ adapters })

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
