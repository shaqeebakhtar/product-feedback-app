"use client";
import React, { useState } from "react";

type Props = {};

const Filter = (props: Props) => {
  const filterOptions = ["UI", "UX", "Enhancement", "Bug", "Feature"];
  const [active, setActive] = useState("UI");

  return (
    <div className="bg-white p-6 shadow-sm rounded-md flex gap-x-3 gap-y-4 flex-wrap">
      <span
        className={
          active === "All"
            ? "cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600"
            : "cursor-pointer py-2 px-4 bg-blue-50 text-blue-500 rounded-xl text-sm font-bold hover:bg-blue-100"
        }
        onClick={() => setActive("All")}
      >
        All
      </span>
      {filterOptions.map((option, index) => (
        <span
          key={index}
          className={
            active === option
              ? "cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600"
              : "cursor-pointer py-2 px-4 bg-blue-50 text-blue-500 rounded-xl text-sm font-bold hover:bg-blue-100"
          }
          onClick={() => setActive(option)}
        >
          {option}
        </span>
      ))}
    </div>
  );
};

export default Filter;
