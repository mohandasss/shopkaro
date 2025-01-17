import React, { useEffect, useState } from "react";
import { getAllProductsAtOnce } from "../Apis/productAPI";
import {Link} from "react-router-dom"

// Product Card Component
const ProductCard = ({ product }) => {
  
  return (
    <div className="w-full sm:w-1/2 lg:w-1/5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
      <Link to={`/products/${product._id}`} state={product} className="flex-grow">
        <img
          className="p-8 h-96 w-full object-cover rounded-s-2xl"
          src={product.imageURL}
          alt={product.name}
        />
      </Link>
      <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
        <h2 className="text-white text-sm">{product.name}</h2>
        <div className="flex items-center mt-2.5 mb-5">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${index < product.rating ? "text-yellow-300" : "text-gray-200"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <span className="ml-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
          <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
            Add to cart
          </button>
        </div>
      </div>
    </div>

  );
};

// Most Purchased This Month Component
const MostPurchased = ({ products }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black mb-5">
        Most Purchased This Month
      </h2>
      <div className="flex flex-wrap gap-4">
        {products.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// New Arrivals Component
const NewArrivals = ({ products }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black mb-5">
        New Arrivals
      </h2>
      <div className="flex flex-wrap gap-4">
        {products.slice(6, 11).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

// Most Discounts Component
const MostDiscounts = ({ products }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black mb-5">
        Most Discounts
      </h2>
      <div className="flex flex-wrap gap-4">
        {products.slice(12, 17).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const ProductSections = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProductsAtOnce();
        console.log(response);
        
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-5 py-10 space-y-10">
      {/* Most Purchased This Month */}
      <MostPurchased products={products} />

      {/* New Arrivals */}
      <NewArrivals products={products} />

      {/* Most Discounts */}
      <MostDiscounts products={products} />
    </div>
  );
};

export default ProductSections;
