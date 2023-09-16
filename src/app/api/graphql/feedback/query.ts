import prisma from "@/lib/db";
import { z } from "zod";

const getFeedbackSchema = z.object({
  feedbackId: z.string(),
});

export const feedbackQuery = {
  getFeedbacks: async () => {
    return await prisma.feedback.findMany();
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
