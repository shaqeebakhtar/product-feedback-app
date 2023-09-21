import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";

const addFeedbackSchema = z.object({
  title: z.string(),
  tag: z.string(),
  details: z.string(),
});

export const feedbackMutation = {
  addFeedback: async (obj: any, args: z.infer<typeof addFeedbackSchema>) => {
    const { title, tag, details } = addFeedbackSchema.parse(args);

    const session = await getServerSession(authOptions);

    const feedback = await prisma.feedback.create({
      data: {
        title,
        tag,
        details,
        creatorId: session?.user.id as string,
      },
    });

    return feedback;
  },

  upvote: async (obj: any, { feedbackId }: { feedbackId: string }) => {
    const session = await getServerSession(authOptions);

    await prisma.userUpvotes.create({
      data: {
        feedbackId,
        userId: session?.user.id as string,
      },
    });

    const feedback = await prisma.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });

    return feedback;
  },
};
