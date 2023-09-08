import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/feedbacks");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex gap-4 items-center">
        <Link
          href="/register"
          className="border-2 border-primary hover:bg-primary hover:text-white transition ease-in-out text-primary font-semibold py-2 px-4 rounded-md text-sm"
        >
          Sign Up
        </Link>

        <Link
          href="/login"
          className="border-2 border-primary bg-primary hover:bg-transparent transition ease-in-out text-white hover:text-primary font-semibold py-2 px-4 rounded-md text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
