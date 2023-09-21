"use client";

import { z } from "zod";
import Feedback from "./feedback";

const upvotedBySchema = z.object({
  id: z.string(),
  userId: z.string(),
  feedbackId: z.string(),
});

const feedbacksSchema = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.string(),
  details: z.string(),
  upvotes: z.string(),
  numberOfComments: z.string(),
});

type Props = {
  feedbacks: z.infer<typeof feedbacksSchema>[];
  isLoading: boolean;
};

const FeedbacksComp = ({ feedbacks, isLoading }: Props) => {
  return isLoading ? (
    <>
      <h1>Loading...</h1>
    </>
  ) : (
    <>
      {feedbacks?.map((feedback: z.infer<typeof feedbacksSchema>) => (
        <Feedback key={feedback.id} feedback={feedback} />
      ))}
    </>
  );
};
export default FeedbacksComp;
