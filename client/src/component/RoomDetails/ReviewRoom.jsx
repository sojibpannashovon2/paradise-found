import React, { useEffect, useState } from "react";
import { GiWheat } from "react-icons/gi";

import { getAllReview } from "../../Api/review";
import ReviewRoomDetails from "./ReviewRoomDetails";

const ReviewRoom = ({ roomData }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getAllReview()
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="text-center mx-auto ">
        <div className="flex font-bold items-center gap-16 ml-14">
          <GiWheat className="text-8xl" />
          <h3 className="text-8xl">{roomData?.ratting || "4.9"} </h3>
          <GiWheat className="text-8xl " />
        </div>
        <div className="text-center mx-auto pt-5 font-sans">
          <h3 className="text-2xl font-semibold">Guest favorite</h3>
          <p className="w-[70%] mx-auto">
            One of the most loved homes on Airbnb based on ratings, reviews, and
            reliability
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:lg:md:grid-cols-2 gap-6 pt-6">
        {reviews?.map((review) => (
          <>
            <ReviewRoomDetails key={review?._id} review={review} />
          </>
        ))}
      </div>
    </>
  );
};

export default ReviewRoom;
