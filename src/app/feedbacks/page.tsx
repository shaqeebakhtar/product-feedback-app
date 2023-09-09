import Comments from "@/components/comments";
import Feedback from "@/components/feedback";
import Filter from "@/components/filter";
import Header from "@/components/header";
import PostComment from "@/components/post-comment";

const Feedbacks = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6">
        <Filter />
        <div className="flex flex-col gap-6 col-span-3">
          <Header />
          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
