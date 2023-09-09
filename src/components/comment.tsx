import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import NestedComment from "./nested-comment";

type Props = {};

const Comment = (props: Props) => {
  return (
    <div>
      <div className="flex items-start justify-between gap-6 py-8">
        <div>
          <div className="rounded-full overflow-hidden w-10 object-cover">
            <Image
              src={"/placeholder_avatar.png"}
              alt="avatar"
              height={40}
              width={40}
            ></Image>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-bold text-slate-800">Elijah Moss</p>
              <p className="text-slate-500">@hexagon.bestagon</p>
            </div>
            <Button className="bg-transparent text-blue-500 hover:bg-blue-100 font-bold flex gap-1">
              Reply
            </Button>
          </div>
          <div className="text-slate-500">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptates fugiat neque eveniet autem nihil harum laboriosam unde?
              Aliquam sit harum neque ut? Eaque totam veniam ad vitae quis
              quaerat impedit nesciunt, exercitationem rerum debitis quas a
              perferendis?
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <NestedComment />
        <NestedComment />
      </div>
    </div>
  );
};

export default Comment;
