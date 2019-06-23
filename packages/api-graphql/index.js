const { ApolloServer } = require('apollo-server')

const schema = require('./src/schema')

// init

function createServer ({ adapter }) {
  return new ApolloServer({
    schema,
    context: { adapter }
  })
}

// expose factory function

module.exports = createServer
