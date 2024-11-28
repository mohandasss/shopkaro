import React from "react";

function CardDetails({ image, name, price, description, id }) {
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg">
      <div className="h-64"> {/* Adjusted height for smaller image */}
        <img
          src={image}
          alt={name} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-md font-medium text-gray-900">{name}</h3> {/* Adjusted font size */}
          <p className="text-md font-medium text-gray-900">₹{price}</p> {/* Adjusted font size */}
        </div>
        <p className="text-sm text-gray-600 opacity-75">
          {description}
        </p>
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
