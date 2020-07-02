require("dotenv").config();

const { createTestClient } = require("apollo-server-testing");
const { ApolloServer } = require("apollo-server-express");
const { gql } = require("apollo-boost");
const TMDbClient = require("../src/server/TMDbClient");
const typeDefs = require("../src/graphql/typeDefs");
const resolvers = require("../src/graphql/resolvers");

const apiKey = process.env.TMDB_API_KEY;

describe("GraphQL API", () => {
  const client = new TMDbClient(apiKey);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ client }),
  });

  const { query } = createTestClient(server);

  it("returns popular movies", async () => {
    const POPULAR = gql`
      query {
        popular {
          id
          title
          overview
        }
      }
    `;

    const response = await query({ query: POPULAR });

    expect(response).toMatchSnapshot();
  });

  it("returns movies by ID", async () => {
    const MOVIE = gql`
      query($id: ID!) {
        movie(id: $id) {
          id
          title
          overview
        }
      }
    `;

    const response = await query({ query: MOVIE, variables: { id: 11 } });

    expect(response).toMatchSnapshot();
  });

  it("returns movies by search query", async () => {
    const SEARCH = gql`
      query($query: String!) {
        search(query: $query) {
          id
          title
          overview
        }
      }
    `;

    const response = await query({
      query: SEARCH,
      variables: { query: "Ocean's Twelve" },
    });

    expect(response).toMatchSnapshot();
  });
});
