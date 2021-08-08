import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

export const TimeStamp = ({ timeData }) => {
  let timeStamp = "";
  if (timeData) {
    const date = parseISO(timeData);
    const timePeriod = formatDistanceToNow(date);

    if (timePeriod === "less than a minute") {
      timeStamp = "<1m";
    } else if (timePeriod.indexOf(" ") > 1) {
      timeStamp = timePeriod.slice(timePeriod.indexOf(" ") + 1);
      timeStamp =
        timeStamp.slice(0, timeStamp.indexOf(" ")) +
        timeStamp.slice(timeStamp.indexOf(" ") + 1, timeStamp.indexOf(" ") + 2);
    } else {
      timeStamp =
        timePeriod.slice(0, timePeriod.indexOf(" ")) +
        timePeriod.slice(
          timePeriod.indexOf(" ") + 1,
          timePeriod.indexOf(" ") + 2
        );
    }
  }
  return (
    <>
      <span title={timeData} className="text-base text-gray-500 mt-0.5">
        {timeStamp}
      </span>
    </>
  );
};
