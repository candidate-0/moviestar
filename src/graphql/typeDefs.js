const { gql } = require("apollo-server-express");

module.exports = gql`
  type Movie {
    id: ID!
    title: String!
  }

  type Query {
    popular: [Movie!]!
    movie(id: ID!): Movie
  }
`;
