"use client";
import { Dispatch, SetStateAction } from "react";

type Props = {
  filterType: string;
  setFilterType: Dispatch<SetStateAction<string>>;
};

const Filter = ({ filterType, setFilterType }: Props) => {
  const filterOptions = ["UI", "UX", "Enhancement", "Bug", "Feature"];

  return (
    <div className="bg-white p-8 shadow-sm rounded-lg h-max sticky top-8">
      <div className="flex gap-x-3 gap-y-4 flex-wrap">
        <button
          className={
            filterType === "all"
              ? "cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600"
              : "cursor-pointer py-2 px-4 bg-blue-50 text-blue-500 rounded-xl text-sm font-bold hover:bg-blue-100"
          }
          onClick={() => {
            setFilterType("all");
          }}
        >
          All
        </button>
        {filterOptions.map((option, index) => (
          <button
            key={index}
            className={
              filterType === option.toLowerCase()
                ? "cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-xl text-sm font-bold hover:bg-blue-600"
                : "cursor-pointer py-2 px-4 bg-blue-50 text-blue-500 rounded-xl text-sm font-bold hover:bg-blue-100"
            }
            onClick={() => {
              setFilterType(option.toLowerCase());
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
