"use client";
import { graphQLClient } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const FEEDBACKS = gql`
  query GetFeedbacks($filterTag: String, $sort: String) {
    getFeedbacks(filterTag: $filterTag, sort: $sort) {
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

type Props = {
  filterTag?: string;
  sort?: string;
};

export const useGetFeedbacks = ({
  filterTag = "all",
  sort = "mostUpvotes",
}: Props = {}) => {
  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks", filterTag, sort],
    queryFn: async () => {
      return await graphQLClient.request(FEEDBACKS, { filterTag, sort });
    },
  });

  return feedbacksQuery;
};
