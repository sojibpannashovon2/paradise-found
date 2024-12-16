import React from "react";
import { NavLink } from "react-router-dom";

const WriteReviews = () => {
  return (
    <>
      <div className="flex justify-between items-center border border-blue-700 p-8 rounded-md shadow-md">
        <p>You Can Left Your Review Here</p>
        <NavLink to={`/room_review`}>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] to-[#d946ef] animate-text-gradient text-lg font-semibold font-sans">
            Write Revew
          </h2>
        </NavLink>
      </div>
    </>
  );
};

export default WriteReviews;
