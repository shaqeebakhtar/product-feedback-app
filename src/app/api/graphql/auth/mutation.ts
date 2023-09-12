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
    const {
      username: inputUsername,
      email,
      password,
    } = registerSchema.parse(args);

    const usernameExists = await prisma.username.findUnique({
      where: {
        username: inputUsername,
      },
    });

    if (usernameExists) {
      return new GraphQLError("Username already exists", {
        extensions: {
          code: "USERNAME_EXISTS",
          http: {
            status: 422,
          },
        },
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return new GraphQLError("Email already in use", {
        extensions: { code: "EMAIL_IN_USE" },
      });
    }

    const hashedPassword = await generateHash(password);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const createdUsername = await prisma.username.create({
      data: {
        userId: createdUser.id,
        username: inputUsername,
      },
    });

    const user = {
      id: createdUser.id,
      username: createdUsername.username,
      email: createdUser.email,
    };

    return user;
  },
};
