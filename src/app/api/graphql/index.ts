import { authTypes, authMutations } from "./auth";

export const typeDefs = `
    ${authTypes}
`;

export const resolvers = {
  Query: {
    hello: () => "world",
  },

  Mutation: {
    ...authMutations,
  },
};
