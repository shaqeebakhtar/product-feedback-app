import prisma from "@/lib/db";
import * as z from "zod";

const usernameSchema = z.object({
  username: z.string(),
});

export const authQuery = {
  username: async (obj: any, args: z.infer<typeof usernameSchema>) => {
    const { username: inputUsername } = args;

    const username = await prisma.username.findUnique({
      where: {
        username: inputUsername,
      },
    });

    return username;
  },
};
