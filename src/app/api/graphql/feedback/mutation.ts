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
        creatorId: session?.user.id,
      },
    });

    return feedback;
  },
};
