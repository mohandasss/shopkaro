import React, { useState } from "react";
import { GiSelfLove } from "react-icons/gi";
import { Link } from "react-router-dom";

function CardDetails({ image, name, price, description, rating, id }) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Link
      to={{
        pathname: `/products/${id}`, // Navigating to the product details page
        state: { image, name, price, description, rating }, // Passing product data as state
      }}
    >
      <div className="max-w-xs rounded-lg overflow-hidden shadow-lg p-4 flex flex-col h-full">
        <div className="relative flex-grow">
          <div className="h-64 rounded-lg overflow-hidden">
            {/* Icon positioned at the top-right corner */}
            <div
              onClick={toggleLike}
              className={`absolute top-2 right-2 p-1 rounded-full shadow-md cursor-pointer transition-colors ${
                isLiked ? "bg-pink-600" : "bg-white"
              }`}
            >
              <GiSelfLove
                size={18}
                className={`${isLiked ? "text-white" : "text-gray-700"}`}
              />
            </div>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-md font-medium text-gray-900">{name}</h3>
            <p className="text-md font-medium text-gray-900">₹{price}</p>
          </div>
          <p className="text-sm text-gray-600 opacity-75 flex-grow mb-4">
            {description}
          </p>
          <button className="w-full bg-gray-900/10 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 py-2 px-4 rounded-md mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CardDetails;
