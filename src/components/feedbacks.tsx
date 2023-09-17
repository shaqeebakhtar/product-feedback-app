"use client";

import { graphQLClient } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { z } from "zod";
import Feedback from "./feedback";

const FEEDBACKS = gql`
  query GetFeedbacks {
    getFeedbacks {
      id
      title
      tag
      details
      upvotes
      numberOfComments
    }
  }
`;

const feedbacksSchema = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.string(),
  details: z.string(),
  upvotes: z.string(),
  numberOfComments: z.string(),
});

const FeedbacksComp = () => {
  const feedbacksQuery = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      return await graphQLClient.request(FEEDBACKS);
    },
  });

  if (feedbacksQuery.isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    return (
      <>
        {feedbacksQuery?.data.getFeedbacks.map(
          (feedback: z.infer<typeof feedbacksSchema>) => (
            <Feedback key={feedback.id} feedback={feedback} />
          )
        )}
      </>
    );
  }
};

export default FeedbacksComp;
