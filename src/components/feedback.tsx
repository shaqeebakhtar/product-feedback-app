import React from "react";
import { Button } from "./ui/button";
import { ChevronUp, MessageCircle } from "lucide-react";
import Link from "next/link";

type Props = {};

const Feedback = (props: Props) => {
  return (
    <Link
      href="#"
      className="bg-white rounded-lg shadow-sm p-8 flex items-start"
    >
      <button className="flex flex-col items-center gap-1 cursor-pointer py-2 px-3 bg-blue-50 text-blue-500 rounded-xl text-sm font-extrabold hover:bg-blue-100 text-center">
        <ChevronUp size={16} strokeWidth={3} />
        <span className="text-slate-600">112</span>
      </button>
      <div className="w-full pl-8 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-800">
              Add tags for solutions
            </h3>
            <p className="text-slate-500">
              Easier to search for solutions based on a specific stack
            </p>
          </div>
          <div className="flex items-center flex-wrap">
            <button className="flex flex-col items-center gap-1 cursor-pointer py-2 px-3 bg-blue-50 text-blue-500 rounded-xl text-sm font-extrabold hover:bg-blue-100 text-center">
              Enhancement
            </button>
          </div>
        </div>
        <div className="flex gap-2 items-center py-2 px-3 text-slate-600 text-sm font-bold">
          <MessageCircle size={20} />
          <span>112</span>
        </div>
      </div>
    </Link>
  );
};

export default Feedback;
