import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    const session = await getServerSession(authOptions);
    console.log(session?.user);

    if (filterTag && filterTag !== "all" && sort == "mostUpvotes") {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          upvotes: "desc",
        },
        where: {
          tag: filterTag,
        },
        include: {
          upvotedBy: {
            where: {
              userId: session?.user.id,
            },
          },
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
        include: {
          upvotedBy: {
            where: {
              userId: session?.user.id,
            },
          },
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
        include: {
          upvotedBy: {
            where: {
              userId: session?.user.id,
            },
          },
        },
      });
    } else if (filterTag == "all" && sort == "mostUpvotes") {
      feedbacks = await prisma.feedback.findMany({
        orderBy: {
          [sortField]: "desc",
        },
        include: {
          upvotedBy: {
            where: {
              userId: session?.user.id,
            },
          },
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
