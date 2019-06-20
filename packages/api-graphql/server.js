const AddokAdapter = require('@cadaster/adapter-addok')

const createServer = require('.')

// assets

const adapter = AddokAdapter({})
const server = createServer({ adapter })

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
