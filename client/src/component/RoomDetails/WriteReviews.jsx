import React from "react";

const WriteReviews = ({ roomData }) => {
  console.log(roomData);
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 ">
          Write a Review
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Rating
          </label>
          <div className="flex space-x-1">
            <button
              className="w-10 h-10 flex justify-center items-center text-yellow-400 border rounded-full hover:bg-gray-100"
              type="button"
              aria-label="1 Star"
            >
              &#9733;
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center text-yellow-400 border rounded-full hover:bg-gray-100"
              type="button"
              aria-label="2 Stars"
            >
              &#9733;
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center text-yellow-400 border rounded-full hover:bg-gray-100"
              type="button"
              aria-label="3 Stars"
            >
              &#9733;
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center text-yellow-400 border rounded-full hover:bg-gray-100"
              type="button"
              aria-label="4 Stars"
            >
              &#9733;
            </button>
            <button
              className="w-10 h-10 flex justify-center items-center text-yellow-400 border rounded-full hover:bg-gray-100"
              type="button"
              aria-label="5 Stars"
            >
              &#9733;
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Comment
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows="4"
            placeholder="Write your comment here..."
          ></textarea>
        </div>

        <button
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="button"
        >
          Submit Review
        </button>
      </div>
    </>
  );
};

export default WriteReviews;
