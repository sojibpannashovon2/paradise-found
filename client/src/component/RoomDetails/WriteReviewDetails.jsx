import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Container from "../Shared/Container";
import NewFooter from "../Shared/Footer/NewFooter";
import { addReview } from "../../Api/review";

const WriteReviewDetails = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();

    const ratting = event.target.ratting.value;
    const comment = event.target.comment.value;
    const time = event.target.time.value;

    console.log(ratting, comment, time);

    const reviewData = {
      reviewer: {
        name: user?.displayName,
        image: user?.photoURL,
      },
      ratting,
      comment,
      time,
    };

    addReview(reviewData)
      .then((data) => {
        console.log(data);
        alert("Review post Successfully");
      })

      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <Container>
        <div className="mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md mb-32">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 ">
            Write a Review
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Rating
                </label>
                <input
                  className="border border-green-800 px-6 py-3 rounded-md"
                  type="text"
                  name="ratting"
                  placeholder="Ratting within 0.0 to 5.0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Use this website from
                </label>
                <input
                  className="border border-green-800 px-8 py-3 rounded-md"
                  type="text"
                  name="time"
                  placeholder="Give year or month or day"
                  required
                />
              </div>

              <div>
                <img
                  className="h-[70px] w-[70px] mb-3 rounded-lg  border-2 border-green-700 fo"
                  src={user?.photoURL}
                  alt=""
                />
                <h2 className="font-serif">User Name: {user?.displayName}</h2>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Comment
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                name="comment"
                placeholder="Write your comment here..."
                required
              ></textarea>
            </div>

            <button
              className=" bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="submit"
            >
              Submit Review
            </button>
          </form>
        </div>

        <NewFooter />
      </Container>
    </>
  );
};

export default WriteReviewDetails;
