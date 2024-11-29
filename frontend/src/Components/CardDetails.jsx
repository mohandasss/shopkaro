import React, { useState } from "react";
import { GiSelfLove } from "react-icons/gi";

function CardDetails({ image, name, price, description, id }) {
  
  const [isLiked, setIsLiked] = useState(false);

  
  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg p-4">
      <div className="relative">
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-medium text-gray-900">{name}</h3>
          <p className="text-md font-medium text-gray-900">₹{price}</p>
        </div>
        <p className="text-sm text-gray-600 opacity-75">{description}</p>
      </div>
      <div className="p-4">
        <button className="w-full bg-gray-900/10 text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 py-2 px-4 rounded-md">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default CardDetails;
