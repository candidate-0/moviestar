require("dotenv").config();

const port = process.env.PORT || 4000;
const apiKey = process.env.TMDB_API_KEY;

const TMDbClient = require("./src/server/TMDbClient");
const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const client = new TMDbClient(apiKey);
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const app = express();

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ client }),
});

apollo.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`🍿 => ${port}`);
});
