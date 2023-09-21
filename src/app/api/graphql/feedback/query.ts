import prisma from "@/lib/db";
import { z } from "zod";

const getFeedbackSchema = z.object({
  feedbackId: z.string(),
});

export const feedbackQuery = {
  getFeedbacks: async (
    obj: any,
    {
      filterTag,
      sort,
    }: {
      filterTag: string;
      sort: string;
    }
  ) => {
    let sortField = "upvotes";
    let feedbacks = null;
    if (sort === "leastUpvotes") {
      sortField = "upvotes";
    } else if (sort === "mostComments" || sort === "leastComments") {
      sortField = "numberOfComments";
    }

    if (filterTag && filterTag !== "all" && sort == "mostUpvotes") {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          upvotes: "desc",
        },
        where: {
          tag: filterTag,
        },
      });
    } else if (sort && sort !== "mostUpvotes" && filterTag == "all") {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          [sortField]:
            sort === "leastUpvotes" || sort === "leastComments"
              ? "asc"
              : "desc",
        },
      });
    } else if (
      sort &&
      filterTag &&
      sort !== "mostUpvotes" &&
      filterTag !== "all"
    ) {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          [sortField]:
            sort === "leastUpvotes" || sort === "leastComments"
              ? "asc"
              : "desc",
        },
        where: {
          tag: filterTag,
        },
      });
    } else if (filterTag == "all" && sort == "mostUpvotes") {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          [sortField]: "desc",
        },
      });
    }

    return feedbacks;
  },

  getFeedback: async (obj: any, agrs: z.infer<typeof getFeedbackSchema>) => {
    const { feedbackId } = getFeedbackSchema.parse(agrs);

    return await prisma.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });
  },
};
