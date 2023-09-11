"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Logout = () => {
  return (
    <>
      <Button
        className="bg-red-100 text-red-600 hover:bg-red-200"
        onClick={() => signOut()}
      >
        <LogOut />
      </Button>
    </>
  );
};

export default Logout;
