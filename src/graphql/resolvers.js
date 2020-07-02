module.exports = {
  Query: {
    popular: async (parent, args, { client }) => await client.popular(),
    movie: async (parent, { id }, { client }) => await client.movie(id),
    search: async (parent, { query }, { client }) => await client.search(query),
  },
};
