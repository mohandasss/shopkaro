import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { addToWishlist, removeFromWishlist } from "../Apis/WistlistAPI";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import Popup from "./popup";
import { addToCart } from "../Apis/cartAPI";
import { useEffect } from "react";
import ReviewForm from "./ReviewForm";


function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { _id, imageURL, reviews, name, price, description, rating, quantity } =
    location?.state.product || location?.state;
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(1);


  
  
  
  
  
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
      const userProfile = await getLoggedInUserProfile();
      const userId = userProfile._id;

      if (userId) {
        setIsLiked((prev) => !prev);

        if (!isLiked) {
          const response = await addToWishlist(userId, _id);
          setPopupMessage("Item added to wishlist!");
        } else {
          await removeFromWishlist(userId, _id);
          setPopupMessage("Item removed from wishlist!");
        }
        setIsPopupVisible(true);
        setTimeout(() => setIsPopupVisible(false), 3000);
      } else {
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

  if (isPopupVisible) {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000); // Hide after 3 seconds
  }
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= quantity) {
      setCurrentQuantity(newQuantity);
    }
  };

  const handlecart = async (id) => {
    try {
      const userProfile = await getLoggedInUserProfile();
      const userId = userProfile._id;
      const response = await addToCart(userId, id, currentQuantity);
     
      
      setPopupMessage("Item added to cart!");
      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 3000);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

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
          <div className="my-4 flex items-center gap-2">
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

          <div className="flex items-center justify-start">
            <button
              className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500"
              onClick={() => handleQuantityChange(currentQuantity - 1)} // Decrease quantity
              disabled={currentQuantity <= 1}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </button>
            <span className="text-4xl font-bold mx-4">{currentQuantity}</span>
            <button
              className="flex justify-center items-center w-10 h-10 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600"
              onClick={() => handleQuantityChange(currentQuantity + 1)} // Increase quantity
              disabled={currentQuantity >= quantity}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v12M6 12h12"
                ></path>
              </svg>
            </button>
          </div>

          {/* Quantity Left */}
          <div className="my-3 flex items-center gap-2">
            <div className="text-red-600 font-bold text-xl">Hurry up!</div>
            <div className="text-gray-900 font-semibold text-xl ml-2">
              only {quantity} left
            </div>
          </div>

          {/* Quantity Left */}
          

          {/* Buttons */}
          <div className="mt-8 flex items-center gap-3">

            <button
              onClick={() => {
                handlecart(_id);
              }}
              className="bg-gray-900 text-white py-2 px-4 rounded-md w-52 hover:bg-gray-800"
            >
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
          <ReviewForm ProductId={_id} />
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

      {/* Show Popup outside of the button */}
      <Popup message={popupMessage} isVisible={isPopupVisible} />
    
      
    </section>
  );
}

export default ProductDetails;
