require("dotenv").config();

const { createTestClient } = require("apollo-server-testing");
const { ApolloServer } = require("apollo-server-express");
const { gql } = require("apollo-boost");
const talkback = require("talkback");
const TMDbClient = require("../src/server/TMDbClient");
const typeDefs = require("../src/graphql/typeDefs");
const resolvers = require("../src/graphql/resolvers");

const apiKey = process.env.TMDB_API_KEY;

// Create a reverse proxy for the TMDb API that replays recorded responses from
// disk. Prevents slow and unreliable external network requests during tests,
// and stabilizes endpoints that may return varied data (e.g. /movie/popular).
const port = process.env.PORT || 4000;
const tmdbProxyURL = `http://localhost:${port}`;
const record = process.env.RECORD
  ? talkback.Options.RecordMode.NEW
  : talkback.Options.RecordMode.DISABLED;
const server = talkback({
  host: TMDbClient.baseURL,
  port,
  record,
  path: __dirname + "/__tapes__",
});

beforeAll(async () => {
  await server.start(() =>
    console.log(`Proxying ${TMDbClient.baseURL} at ${tmdbProxyURL}`)
  );
});

afterAll(() => {
  server.close();
});

describe("GraphQL API", () => {
  const client = new TMDbClient(apiKey, tmdbProxyURL);
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
          runtime
          releaseDate
          cast {
            id
            name
          }
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
