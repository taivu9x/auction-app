import React, { useState } from "react";
import Countdown from "react-countdown";
import { Item, TypeEnum } from "../common/types/item";

type Props = {
  data: Item[];
  onClickBid: (item: Item) => void;
  onClickPublish: (item: Item) => void;
};

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
}: {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  if (completed) {
    // Render a completed state
    return <span>Completed</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

export const ListItem = ({ data, onClickBid, onClickPublish }: Props) => {
  const handleBid = (item: Item) => {
    onClickBid(item);
  };

  const handlePublish = (item: Item) => {
    onClickPublish(item);
  };

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Current Price</th>
          <th className="px-4 py-2 text-left">Duration</th>
          <th className="px-4 py-2 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr className="border-b" key={index}>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.currentPrice}</td>
              <td className="px-4 py-2">
                {item.type === TypeEnum.DRAFT ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      handlePublish(item);
                    }}
                  >
                    Publish
                  </button>
                ) : (
                  <Countdown
                    date={Date.now() + item.duration * 1000}
                    renderer={renderer}
                  />
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={() => {
                    handleBid(item);
                  }}
                >
                  Bid
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
