import { authTypes, authMutations, authQuery } from "./auth";

export const typeDefs = `
    ${authTypes}
`;

export const resolvers = {
  Query: {
    ...authQuery,
  },

  Mutation: {
    ...authMutations,
  },
};
