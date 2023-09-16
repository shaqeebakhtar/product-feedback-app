import { authTypes, authMutations, authQuery } from "./auth";
import { feedbackTypes, feedbackMutation, feedbackQuery } from "./feedback";

export const typeDefs = `
    ${authTypes}
    ${feedbackTypes}
`;

export const resolvers = {
  Query: {
    ...authQuery,
    ...feedbackQuery,
  },

  Mutation: {
    ...authMutations,
    ...feedbackMutation,
  },
};
