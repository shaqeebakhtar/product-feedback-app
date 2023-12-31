import NextAuth, { DefaultSession } from "next-auth";
import { DefaultSerializer } from "v8";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      id: string;
    } & DefaultSession["user"];
  }
}
