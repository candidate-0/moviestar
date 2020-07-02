const { gql } = require("apollo-server-express");

module.exports = gql`
  type Movie {
    id: ID!
    title: String!
    overview: String!
    posterURL: String
    releaseDate: String
    revenue: Int
    runtime: Int
    cast: [Actor!]
  }

  type Actor {
    id: ID!
    name: String!
  }

  type Query {
    popular: [Movie!]!
    movie(id: ID!): Movie
    search(query: String!): [Movie!]!
  }
`;
