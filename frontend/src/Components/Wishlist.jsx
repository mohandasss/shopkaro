import React, { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "../Apis/WistlistAPI";
import { getLoggedInUserProfile } from "../Apis/userAPI";

const Wishlist = () => {
  const [wishdata, setwishdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLoggedInUserProfile();
        const response = await getWishlist(data.userId);
        setwishdata(response.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRemove = async (id) => {
    try {
      const data = await getLoggedInUserProfile(); // Get user profile
      const userId = data.userId;
      const productId = id;
      
      const response = await removeFromWishlist(userId, productId); // Remove the product using _id and userId
      
      if (response.success) {
        // Update local state immediately after successful removal
        setwishdata((prev) => prev.filter((item) => item._id !== productId)); // Filter out the removed product
      } else {
        console.log("Failed to remove product");
      }
      
      console.log("Removed product with id:", productId, "for userId:", userId);
      console.log(response);
  
      // Reload the page after 0.5 seconds
      setTimeout(() => {
        window.location.reload();
      }, 1);
    } catch (error) {
      console.error("Something went wrong while removing from wishlist", error);
    }
  };
  
  

  return (
    <section className="py-24 2xl:py-44 bg-blueGray-100">
    <div className="container px-4 mx-auto">
      <h2 className="mb-14 xl:mb-24 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-medium text-center">
        Your favorites
      </h2>

      {/* Check if the wishlist is empty */}
      {wishdata.length < 1 ? (
        <div className="bg-yellow-100 border border-yellow-500 p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-bold text-yellow-700">Oops!</h3>
          <p className="text-md text-yellow-700 mt-2">
            Make sure you add some favorite products
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishdata.map((item) => (
            <div
              key={item._id} // Ensure unique keys are provided
              className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image section with fixed height */}
              <a href="#" className="block mx-auto max-w-max">
                <img
                  className="h-64 w-full rounded-lg object-cover"
                  src={item.imageURL} // Use item.imageURL if available
                  alt={item.name}
                />
              </a>

              {/* Product Details */}
              <div className="p-6 relative">
                <a href="#">
                  <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">
                    {item.name}
                  </p>
                </a>
                <p className="text-xl text-blue-500 font-heading font-medium tracking-tighter">
                  <span className="text-base pr-2">₹</span>
                  <span>{item.price}</span> {/* Use item.price if available */}
                </p>

                {/* Remove Button positioned at the bottom right */}
                <button
                  className="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                  onClick={() => handleRemove(item._id)} // Corrected to use item._id
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
  );
};

export default Wishlist;
