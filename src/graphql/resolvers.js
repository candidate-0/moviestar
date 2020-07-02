module.exports = {
  Query: {
    popular: async (parent, args, { client }) => await client.popular(),
  },
};
