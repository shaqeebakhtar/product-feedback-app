"use client";

import Comments from "@/components/comments";
import Feedback from "@/components/feedback";
import PostComment from "@/components/post-comment";
import { Button } from "@/components/ui/button";
import { graphQLClient } from "@/lib/graphql-client";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const FEEDBACK = gql`
  query GetFeedback($feedbackId: String!) {
    getFeedback(feedbackId: $feedbackId) {
      id
      title
      tag
      details
      upvotes
      numberOfComments
    }
  }
`;

const FeedbackPage = ({ params }: { params: { id: string } }) => {
  const feedbackQuery = useQuery({
    queryKey: ["feedback", params.id],
    queryFn: async () => {
      return await graphQLClient.request(FEEDBACK, { feedbackId: params.id });
    },
  });

  if (feedbackQuery.isLoading) return <h1>Loading...</h1>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/feedbacks"
            className="bg-transparent hover:bg-blue-100 font-bold flex items-center gap-2 px-4 py-2 rounded-md"
          >
            <ChevronLeft size={16} strokeWidth={3} className="text-blue-500" />
            <span className="text-slate-600 text-sm">Go Back</span>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 font-bold flex gap-1">
            Edit Feedback
          </Button>
        </div>
        <Feedback feedback={feedbackQuery?.data.getFeedback} />
        <Comments />
        <PostComment />
      </div>
    </div>
  );
};

export default FeedbackPage;
