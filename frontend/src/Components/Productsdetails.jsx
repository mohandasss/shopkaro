import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { addToWishlist,removeFromWishlist } from "../Apis/WistlistAPI";
import { getLoggedInUserProfile } from "../Apis/userAPI";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { _id, imageURL, reviews, name, price, description, rating, quantity } =
    location.state;

        
        console.log(location.state._id);
        

  // Handle case where state is missing (e.g., user accesses directly via URL)
  if (!location.state) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-xl font-bold text-red-500">
          No product details found.
        </h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go Back to Products
        </button>
      </div>
    );
  }

  const toggleLike = async () => {
    try {
      // Fetch the logged-in user profile
      const userProfile = await getLoggedInUserProfile();
      const userId = userProfile._id;

      // Check if user is logged in
      if (userId) {
        setIsLiked((prev) => !prev);

        // Add or remove from wishlist based on the current state of isLiked
        if (!isLiked) {
          
          console.log(userId,  _id); // Optionally, log the response
          // Add product to wishlist
          const response = await addToWishlist(userId, _id);
        } else {
          // Remove product from wishlist
          await removeFromWishlist(userId, _id);
        }
      } else {
        // Handle case where user is not logged in
        console.error("User is not logged in.");
      }
    } catch (error) {
      console.error("Error while handling wishlist:", error);
    }
  };

  const handleShowMoreReviews = () => {
    setShowAllReviews(true);
  };

  // Reviews for infinite scrolling
  const displayedReviews = reviews.slice(
    0,
    showAllReviews ? reviews.length : 5
  );
  const duplicateReviews = displayedReviews.concat(displayedReviews);

  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <img
          src={imageURL}
          alt={name}
          className="h-[36rem] w-auto sticky object-cover rounded-lg shadow-lg"
        />

        {/* Product Details */}
        <div className="mt-8 md:mt-0 md:ml-8 flex flex-col">
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
              Buy now
            </button>
            <button className="bg-gray-900 text-white py-2 px-4 rounded-md w-52 hover:bg-gray-800">
              Add to Cart
            </button>
            <div
              onClick={toggleLike}
              className={`p-2 rounded-full cursor-pointer transition-all duration-300 ${
                isLiked ? "bg-pink-600" : "bg-gray-100"
              } shadow-md hover:scale-110`}
            >
              <GiSelfLove
                size={24}
                className={`${isLiked ? "text-white" : "text-pink-600"}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section with Infinite Carousel */}
      <div className="mt-8 md:mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

        {reviews && reviews.length > 0 ? (
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-reviews space-x-4">
              {duplicateReviews.map((review, index) => (
                <div
                  key={index}
                  className="w-72 bg-white border border-gray-300 rounded-lg p-4 shadow-md"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`${
                            starIndex < review.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      {review.rating} / 5
                    </p>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Show "See More" button if reviews > 5 */}
        {!showAllReviews && reviews.length > 5 && (
          <button
            onClick={handleShowMoreReviews}
            className="mt-6 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            See More Reviews
          </button>
        )}
      </div>
    </section>
  );
}

export default ProductDetails;
