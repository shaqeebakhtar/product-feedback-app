import { graphQLClient } from "@/lib/graphql-client";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";

const UPOVTE_FEEDBACK = gql`
  mutation Upvote($feedbackId: String!, $voteValue: Int!) {
    upvote(feedbackId: $feedbackId, voteValue: $voteValue) {
      id
      title
      tag
      details
      upvotes
      numberOfComments
      upvotedBy {
        userId
      }
    }
  }
`;

export const useOnUpvote = () => {
  const upvoteMutation = useMutation({
    mutationKey: ["upvote"],
    mutationFn: async ({
      feedbackId,
      voteValue,
    }: {
      feedbackId: string;
      voteValue: number;
    }) => {
      return await graphQLClient.request(UPOVTE_FEEDBACK, {
        feedbackId,
        voteValue,
      });
    },
  });

  if (upvoteMutation.isSuccess) console.log("upvoteMutation", upvoteMutation);

  return upvoteMutation;
};
