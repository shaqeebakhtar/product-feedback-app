import Comments from "@/components/comments";
import Feedback from "@/components/feedback";
import PostComment from "@/components/post-comment";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="bg-transparent hover:bg-blue-100 font-bold flex items-center gap-2 px-4 py-2 rounded-md"
          >
            <ChevronLeft size={16} strokeWidth={3} className="text-blue-500" />
            <span className="text-slate-600 text-sm">Go Back</span>
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700 font-bold flex gap-1">
            Edit Feedback
          </Button>
        </div>
        <Feedback />
        <Comments />
        <PostComment />
      </div>
    </div>
  );
};

export default page;
