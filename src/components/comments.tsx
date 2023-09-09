import React from "react";
import Comment from "./comment";

type Props = {};

const Comments = (props: Props) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h4 className="font-bold text-slate-800">4 Comments</h4>
      <div className="[&>*:not(:first-child)]:border-t-[1.5px] [&>*:not(:first-child)]:border-slate-200">
        <Comment />
      </div>
    </div>
  );
};

export default Comments;
