import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { image, reviews, name, price, description, rating, quantity } =
    location.state || {};

  // Handle case where state is missing (e.g., user accesses directly via URL)
  if (!location.state) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold text-red-500">No product details found.</h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  const handleShowMoreReviews = () => {
    setShowAllReviews(true);
  };

  // Duplicate reviews for continuous scrolling
  const displayedReviews = reviews.slice(0, showAllReviews ? reviews.length : 5);
  const duplicateReviews = displayedReviews.concat(displayedReviews);

  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <img
          src={image}
          alt={name}
          className="h-[36rem] sticky object-cover rounded-lg"
        />

        {/* Product Details */}
        <div className="mt-8 md:mt-0 md:ml-8 flex flex-col  top-16">
          <h3 className="text-3xl font-bold mb-4">{name}</h3>
          <p className="text-xl text-gray-900">₹{price}</p>
          <p className="mt-4 text-base text-gray-500">{description}</p>

          {/* Rating */}
          <div className="my-8 flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <p className="text-sm font-bold text-gray-700">
              {rating} / 5 (100 reviews)
            </p>
          </div>

          {/* Quantity Left */}
          <div className="my-3 flex items-center gap-2">
            <div className="text-red-600 font-bold text-xl">Hurry up!</div>
            <div className="text-gray-900 font-semibold text-xl ml-2">
              only {quantity} left
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex items-center gap-3">
            <button className="bg-gray-900 text-white py-2 px-4 rounded-md w-52 hover:bg-gray-800">
              Add to Cart
            </button>
            <button
              className="bg-gray-100 text-gray-900 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              <span role="img" aria-label="heart">
                ❤️
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section with Infinite Carousel */}
      <div className="mt-8 md:mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {/* Show only a limited number of reviews initially */}
        {reviews && reviews.length > 0 ? (
          <div className="relative overflow-hidden">
            {/* Infinite Scrolling Reviews Container */}
            <div className="flex animate-scroll-reviews">
              {duplicateReviews.map((review, index) => (
                <div
                  key={index}
                  className="w-72 bg-white border border-gray-300 rounded-lg p-4 m-4 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`text-yellow-500 ${
                            starIndex < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{review.rating} / 5</p>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Show "See More" if there are more than 2 reviews */}
        
      </div>
    </section>
  );
}

export default ProductDetails;
