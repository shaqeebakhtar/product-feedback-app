"use client";

import FeedbacksComp from "@/components/feedbacks";
import Filter from "@/components/filter";
import Header from "@/components/header";
import { useGetFeedbacks } from "@/hooks/useGetFeedbacks";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const feedbacksSchema = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.string(),
  details: z.string(),
  upvotes: z.string(),
  numberOfComments: z.string(),
});

const Feedbacks = () => {
  const session = (async () => {
    return await getSession();
  })();

  const [feedbacks, setFeedbacks] = useState<z.infer<typeof feedbacksSchema>[]>(
    []
  );
  const [filterType, setFilterType] = useState("all");
  const [sort, setSort] = useState("mostUpvotes");
  const feedbacksQuery = useGetFeedbacks({ filterTag: filterType, sort });

  useEffect(() => {
    if (!feedbacksQuery.isLoading && !feedbacksQuery.isError) {
      console.log(feedbacksQuery.data);

      setFeedbacks(feedbacksQuery?.data?.getFeedbacks!);
    }
  }, [
    feedbacksQuery.isLoading,
    feedbacksQuery.isError,
    feedbacksQuery.data,
    filterType,
    sort,
  ]);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 gap-6">
        <Filter filterType={filterType} setFilterType={setFilterType} />
        <div className="flex flex-col gap-6 col-span-3">
          <Header sort={sort} setSort={setSort} />
          <FeedbacksComp
            feedbacks={feedbacks}
            isLoading={!!feedbacksQuery.isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
