import React from "react";

const ReviewRoomDetails = ({ review }) => {
  console.log(review);
  return (
    <div className="border border-slate-500 bottom-2 p-6 rounded-xl shadow-sm shadow-slate-300 ">
      <div className="flex items-center  gap-2">
        <div>
          <img
            className="h-16 w-16 rounded-full border-2 border-green-700 "
            src={review?.reviewer?.image}
            alt=""
          />
        </div>
        <div>
          <h3>{review?.reviewer?.name}</h3>
          <p>3 year on Paradise Found</p>
        </div>
      </div>
      <div className="flex text-center items-center gap-3 pt-4">
        <div className="flex "></div>
        <label className="text-semibold text-green-700">Rattings</label>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#d42d38] to-[#eadf16] animate-text-gradient text-lg font-semibold font-sans">
          {review?.ratting} Star
        </h2>
        <div>
          <span>
            {review?.time} <span className="pl-2">ago</span>
          </span>
        </div>
      </div>
      <p className="pt-4">
        It was a lovely stay with Sid felt right at home at peace. Little walk
        down to the place but worth it. The rooms are clean, sit out with the
        view is amazing. Sid n his wife takes pride in
      </p>
    </div>
  );
};

export default ReviewRoomDetails;
