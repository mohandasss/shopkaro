import React, { useState, useEffect, useRef } from "react";
import { getAllProductsAtOnce } from "../Apis/productAPI";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    // Fetch initial products
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { products } = await getAllProductsAtOnce(page);
      console.log(products);

      // Fetch products for the current page
      setProducts((prevProducts) => [...prevProducts, ...products]); // Append new products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  // Intersection Observer to detect when we reach the bottom of the list
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // Trigger the fetch of more products when the "load more" element is in view
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null, // viewport
        rootMargin: "20px", // margin before it triggers
        threshold: 1.0, // fully in view
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="space-y-4 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex items-center justify-between bg-gray-100  rounded-lg shadow-lg p-4"
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
            <p className="text-gray-700  mt-2">₹{product.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {product.description || "No description available"}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                /* handle remove */
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center">
          <span>Loading more products...</span>
        </div>
      )}

      {/* Trigger for Intersection Observer */}
      <div ref={loadMoreRef} className="text-center">
        {!loading && <span>Scroll to load more products</span>}
      </div>
    </div>
  );
};

export default Products;
