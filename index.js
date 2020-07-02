require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const TMDbClient = require("./src/client");

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
  }

  type Query {
    popular: [Movie!]!
  }
`;

const resolvers = {
  Query: {
    popular: async () => {
      return await new TMDbClient(process.env.TMDB_API_KEY).popular();
    },
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🍿 => ${port}`);
});
