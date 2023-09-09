import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type Props = {};

const PostComment = (props: Props) => {
  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h4 className="font-bold text-slate-800">Add Comment</h4>
        <div className="space-y-4 mt-6">
          <Textarea placeholder="Type your comment here." />
          <div className="flex items-center justify-between">
            <p className="text-slate-500">250 Characters left</p>
            <Button className="bg-purple-600 hover:bg-purple-700 font-bold flex gap-1">
              Post Comment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostComment;
