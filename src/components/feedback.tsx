import { useOnUpvote } from "@/hooks/useOnUpvote";
import { ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

type Props = {
  feedback: z.infer<typeof feedbacksSchema>;
};

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
  upvotedBy: z.array(upvotedBySchema),
});

const Feedback = ({ feedback }: Props) => {
  const upvoteMutation = useOnUpvote();
  const [upvoted, setUpvoted] = useState(!!feedback.upvotedBy[0]?.userId);

  return (
    <Link
      href={`/feedbacks/${feedback.id}`}
      className="bg-white rounded-lg shadow-sm p-8 flex items-start"
    >
      <button
        className={
          upvoted
            ? "flex flex-col items-center gap-1 cursor-pointer py-2 px-3 bg-blue-500 text-white rounded-xl text-sm font-extrabold hover:bg-blue-600 text-center"
            : "flex flex-col items-center gap-1 cursor-pointer py-2 px-3 bg-blue-50 text-blue-500 rounded-xl text-sm font-extrabold hover:bg-blue-100 text-center"
        }
        onClick={(e) => {
          e.preventDefault();
          setUpvoted(!upvoted);
          upvoteMutation.mutate({
            feedbackId: feedback.id,
            voteValue: upvoted ? -1 : 1,
          });
        }}
      >
        <ChevronUp size={16} strokeWidth={3} />
        <span className={upvoted ? "text-white" : "text-slate-600"}>
          {feedback.upvotes}
        </span>
      </button>
      <div className="w-full pl-8 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800">
              {feedback.title}
            </h3>
            <p className="text-slate-500">{feedback.details}</p>
          </div>
          <div className="flex items-center flex-wrap">
            <button
              className="flex flex-col items-center gap-1 cursor-pointer py-2 px-3 bg-blue-50 text-blue-500 rounded-xl text-sm font-extrabold hover:bg-blue-100 text-center"
              onClick={(e) => e.preventDefault()}
            >
              {feedback.tag}
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center py-2 px-3 text-slate-600 text-sm font-bold">
          <MessageCircle size={20} />
          <span>{feedback.numberOfComments}</span>
        </div>
      </div>
    </Link>
  );
};

export default Feedback;
