const createServer = require('.')

// assets

const server = createServer({ })

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
