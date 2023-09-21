import { graphQLClient } from "@/lib/graphql-client";
import { useMutation } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { useGetFeedbacks } from "./useGetFeedbacks";

const UPOVTE_FEEDBACK = gql`
  mutation Upvote($feedbackId: String!) {
    upvote(feedbackId: $feedbackId) {
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
  const feedbacksQuery = useGetFeedbacks();

  const upvoteMutation = useMutation({
    mutationKey: ["upvote"],
    mutationFn: async ({ feedbackId }: { feedbackId: string }) => {
      return await graphQLClient.request(UPOVTE_FEEDBACK, {
        feedbackId,
      });
    },
    onSuccess: () => {
      feedbacksQuery.refetch();
    },
  });

  if (upvoteMutation.isSuccess) console.log("upvoteMutation", upvoteMutation);

  return upvoteMutation;
};
