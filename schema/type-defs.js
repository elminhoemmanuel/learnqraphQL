const { gql } = require("apollo-server")

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        username: String!
        age: String!
        nationality: String!
    }

    type Query {
        users: [User!]!
    }
`

module.exports = { typeDefs }