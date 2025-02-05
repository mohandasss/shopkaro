import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || review.trim() === "") {
      alert("Please provide a rating and a review.");
      return;
    }
    
    const reviewData = {
      rating,
      review,
    };

    console.log("Review Submitted:", reviewData);
    // Make an API call to save the review in the database
    // fetch('/api/reviews', { method: 'POST', body: JSON.stringify(reviewData) })

    setRating(0);
    setReview("");
  };

  return (
    <div className="max-w-2xl  mt-4 p-4 bg-gray-950 :bg-gray-800 rounded-2xl shadow-lg">
  <h2 className="text-xl font-semibold text-gray-900 text-white mb-3">
    Write a Review
  </h2>
  {/* Star Rating */}
  <div className="flex mb-3">
    {[...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <FaStar
          key={index}
          className={`w-7 h-7 cursor-pointer transition-all duration-300 ${
            starValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHover(starValue)}
          onMouseLeave={() => setHover(0)}
        />
      );
    })}
  </div>
  {/* Text Area */}
  <textarea
    className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 :bg-gray-700 :text-white"
    placeholder="Write your review here..."
    value={review}
    onChange={(e) => setReview(e.target.value)}
  ></textarea>
  {/* Submit Button */}
  <button
    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
    onClick={handleSubmit}
  >
    Submit Review
  </button>
</div>

  );
};

export default ReviewForm;
