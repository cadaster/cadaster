const { ApolloServer } = require('apollo-server')

const schema = require('./src/schema')

// init

function createServer ({ adapters }) {
  return new ApolloServer({
    schema,
    context: { adapters }
  })
}

// expose factory function

module.exports = createServer
