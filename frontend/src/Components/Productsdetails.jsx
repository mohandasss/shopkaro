import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/outline";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { image, name, price, description, rating } = location.state || {};

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

  return (
    <section className="py-16 px-8">
    <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="h-[36rem] object-cover rounded-lg"
      />

      {/* Product Details */}
      <div className="mt-8 md:mt-0 md:ml-8">
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

        {/* Color Selection */}
        <h6 className="text-lg font-semibold text-gray-900">Color</h6>
        <div className="my-3 flex items-center gap-2">
          {/* Add color options dynamically if needed */}
          <div className="h-5 w-5 rounded-full border border-gray-900 bg-blue-600"></div>
          <div className="h-5 w-5 rounded-full border border-blue-100 bg-gray-300"></div>
          <div className="h-5 w-5 rounded-full border border-blue-100 bg-black"></div>
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
  </section>
  );
}

export default ProductDetails;
