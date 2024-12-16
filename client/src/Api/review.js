//Add a review to database

export const addReview = async (reviewData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reviewData),
  });

  const data = await response.json();
  return data;
};

// Get Review from database

export const getAllReview = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews`);
  const data = await response.json();

  return data;
};
