import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import { addToCart } from "../Apis/cartAPI";

import React, { useState, useEffect } from "react";
import './CardDetails.css';  // Importing the CSS file for animation

function CardDetails({
  reviews,
  imageURL,
  name,
  quantity,
  price,
  description,
  rating,
  _id,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Add to Cart");
  const [buttonColor, setButtonColor] = useState("bg-gray-900");
  const [animateText, setAnimateText] = useState(false);  // For text animation
  const [showAddedMessage, setShowAddedMessage] = useState(false); // For showing 'Added to Cart' message

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  // Automatically reset the button after 3 seconds
  useEffect(() => {
    if (animateText) {
      const timer = setTimeout(() => {
        setButtonText("Add to Cart");
        setButtonColor("bg-gray-900"); // Reset button color
        setAnimateText(false);  // Reset the animation state
        setShowAddedMessage(false); // Hide the message after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [animateText]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Fetch the logged-in user's profile to get the userId
      const userProfile = await getLoggedInUserProfile();
      const userId = userProfile._id; // Assuming _id is the userId field in the profile
      const productId = _id;
      const quantity = 1;

      // Call the addToCart function to add the product to the cart
      const response = await addToCart(userId, productId, quantity);

      if (response.status === 200) {
        setButtonText("Added to Cart");
        setButtonColor("bg-green-500");
        setAnimateText(true);  // Trigger animation when the item is added to cart
        setShowAddedMessage(true); // Show 'Added to Cart' message
      }
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-lg overflow-hidden shadow-lg p-4 flex flex-col h-full">
      <div className="h-64 relative rounded-lg overflow-hidden">
        <img
          src={imageURL}
          alt={name}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      <Link
        to={`/products/${_id}`}
        state={{
          _id,
          imageURL,
          name,
          price,
          description,
          quantity,
          rating,
          reviews,
        }}
      >
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-medium text-gray-900">{name}</h3>
            <p className="text-md font-medium text-gray-900">₹{price}</p>
          </div>
          <p className="text-sm text-gray-600 opacity-75 flex-grow mb-4 min-h-[60px]">
            {description}
          </p>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full ${buttonColor} text-white hover:bg-gray-900/10 hover:text-gray-900 focus:outline-none focus:ring-2 duration-500 focus:ring-gray-900 py-2 px-4 rounded-md mt-4 text-base sm:text-lg lg:text-xl ${animateText ? 'animate-fade' : ''}`}
      >
        {isLoading ? "Adding..." : buttonText}
      </button>

      {/* Show the 'Added to Cart' message for 3 seconds */}
      {showAddedMessage && (
        <div className="mt-2 text-green-500">
          Added to Cart
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CardDetails;
