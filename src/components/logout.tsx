"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const Logout = () => {
  return (
    <Button
      className="bg-red-100 text-red-600 hover:bg-red-200"
      onClick={() => signOut()}
    >
      <LogOut />
    </Button>
  );
};

export default Logout;
