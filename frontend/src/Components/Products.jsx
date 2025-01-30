import React, { useState, useEffect } from "react";
import { deleteProduct, getAllProductsAtOnce } from "../Apis/productAPI";
import Popup from "./popup";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(""); // To store the message for the popup

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProductsAtOnce(); // Fetch all products
    console.log(response);
    
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleremove = async (productId) => {
    try {
      await deleteProduct(productId);

      // Remove product locally without reloading
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );

      // Show success message
      setMessage("Product successfully removed.");
      setIsVisible(true);
    } catch (error) {
      setMessage("Error removing product.");
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="space-y-4 p-4">
      {/* Popup */}
      <Popup message={message} isVisible={isVisible} />

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center">
          <span>Loading products...</span>
        </div>
      )}

      {/* Products List */}
      {!loading && products.length > 0 && (
        products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between bg-gray-100 rounded-lg shadow-lg p-4"
          >
            {/* Image Section */}
            <div className="flex-shrink-0">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold text-gray-900 ">
                {product.name}
              </h3>
              <p className="text-gray-700 mt-2">₹{product.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleremove(product._id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {/* No Products Message */}
      {!loading && products.length === 0 && (
        <div className="text-center">
          <span>No products available.</span>
        </div>
      )}
    </div>
  );
};

export default Products;
