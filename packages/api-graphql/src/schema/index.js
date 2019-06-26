const { importSchema } = require('graphql-import')
const { makeExecutableSchema } = require('graphql-tools')

const resolvers = require('./resolvers')

//
const TYPE_DEFS_PATH = `${__dirname}/typeDefs/index.graphql`
const typeDefs = importSchema(TYPE_DEFS_PATH)

//

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
