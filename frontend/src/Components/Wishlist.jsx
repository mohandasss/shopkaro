import React, { useEffect, useState } from "react";
import { getWishlist } from "../Apis/WistlistAPI";
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

  return (
    <section className="py-24 2xl:py-44 bg-blueGray-100">
      <div className="container px-4 mx-auto">
        <h2 className="mb-14 xl:mb-24 text-9xl xl:text-xl font-heading font-medium text-center">
          Products
        </h2>
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
              <div className="p-6">
                <a href="#">
                  <p className="mb-4 text-xl leading-8 font-heading font-medium hover:underline">
                    {item.name}
                  </p>
                </a>
                <p className="text-xl text-blue-500 font-heading font-medium tracking-tighter">
                  <span className="text-base pr-2">₹</span>
                  <span>{item.price }</span>{" "}
                  {/* Use item.price if available */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
