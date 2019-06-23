const { gql } = require('apollo-server')

const query = gql`
  query ($input: SearchInput!) {
    search (input: $input) {
      status
    }
  }
`
function search (client, input) {
  const params = {
    query,
    variables: {
      input
    }
  }

  return client
    .query(params)
    .then(res => res.data)
}

module.exports = {
  search
}
