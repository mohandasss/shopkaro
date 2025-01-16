import React, { useState } from "react";
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import { addToCart } from "../Apis/cartAPI";

function CardDetails({
  reviews,
  image,
  name,
  quantity,
  price,
  description,
  rating,
  id,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Fetch the logged-in user's profile to get the userId
      const userProfile = await getLoggedInUserProfile();
      const userId = userProfile._id; // Assuming _id is the userId field in the profile

      // Call the addToCart function to add the product to the cart
      const response = await addToCart({
        userId, // User's ID
        productId: id, // Product's ID
        quantity: 1, // Quantity of the product to add
      });

      if (response.status === 200) {
        // Optionally, handle success (e.g., show a success message)
        alert("Product added to cart!");
      }
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg p-4 flex flex-col h-full">
      <div className="h-64 relative rounded-lg overflow-hidden">
        <div
          onClick={toggleLike}
          className={`absolute top-2 right-2 p-1 rounded-full shadow-md cursor-pointer transition-colors ${
            isLiked ? "bg-pink-600" : "bg-white"
          }`}
        >
          <GiSelfLove
            size={18}
            className={`${
              isLiked ? "text-white" : "text-gray-700"
            } hover:scale-105 duration-200`}
          />
        </div>
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover rounded-lg"
        />
      </div>

      <Link
        to={`/products/${id}`}
        state={{ image, name, price, description, quantity, rating, reviews }}
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
        className="w-full bg-gray-900 text-white hover:bg-gray-900/10 hover:text-gray-900 focus:outline-none focus:ring-2 duration-500 focus:ring-gray-900 py-2 px-4 rounded-md mt-4"
      >
        {isLoading ? "Adding..." : "Add to Cart"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default CardDetails;
