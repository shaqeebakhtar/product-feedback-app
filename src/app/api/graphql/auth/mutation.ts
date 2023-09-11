import prisma from "@/lib/db";
import { generateHash } from "@/lib/hash";
import { GraphQLError } from "graphql";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const authMutations = {
  register: async (obj: any, args: z.infer<typeof registerSchema>) => {
    const { username, email, password } = registerSchema.parse(args);

    const usernameExists = await prisma.username.findUnique({
      where: {
        username,
      },
    });

    if (usernameExists) {
      return new GraphQLError("username already exists", {
        extensions: { code: "DUPLICATE_INPUT" },
      });
    }

    const hashedPassword = await generateHash(password);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return {
      username,
      email,
      password,
    };
  },
};
