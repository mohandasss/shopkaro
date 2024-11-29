import React, { useState, useEffect } from 'react';
import Carousel from "../Components/Carousel";
import Bento from "../Components/Bento";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user profile is available in localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user state
    }
  }, []);

  return (
    <>
      <Carousel />
      <Bento />

      {/* Render avatar and user info if user is logged in */}
      {user ? (
        <div className="flex items-center mt-6 space-x-4">
          <img
            src={user.avatar} // Assuming user profile contains an avatar URL
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="text-lg font-semibold text-gray-800">Welcome, {user.name}</p>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500">Please log in to see your profile</p>
      )}
    </>
  );
};

export default HomePage;
