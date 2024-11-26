import React from "react";
import { GiWheat } from "react-icons/gi";
const ReviewRoom = () => {
  return (
    <div>
      <div className="flex font-bold">
        <GiWheat className="text-9xl" />
        <GiWheat className="text-9xl transform -rotate-180" />
      </div>
      <div>this is review section</div>
    </div>
  );
};

export default ReviewRoom;
