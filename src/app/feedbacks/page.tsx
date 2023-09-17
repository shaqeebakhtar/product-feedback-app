import FeedbacksComp from "@/components/feedbacks";
import Filter from "@/components/filter";
import Header from "@/components/header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Feedbacks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6">
        <Filter />
        <div className="flex flex-col gap-6 col-span-3">
          <Header />
          <FeedbacksComp />
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
