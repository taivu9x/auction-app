import React from "react";
import { TypeFilter } from "../common/types/item";

type Props = {
  onFilter: (filter?: TypeFilter) => void;
};

export const Filter = ({ onFilter }: Props) => {
  return (
    <div className=" flex  my-4">
      TYPE
      <select
        className="ml-2 border border-gray-300 rounded-md px-2"
        onChange={(e) => {
          onFilter(e.target.value as TypeFilter);
        }}
      >
        <option value={undefined}>All</option>
        <option value={TypeFilter.ONGOING}>Ongoing</option>
        <option value={TypeFilter.COMPLETED}>Completed</option>
      </select>
    </div>
  );
};
