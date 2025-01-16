import React, { useState, useEffect } from 'react';
import Carousel from "../Components/Carousel";
import Bento from "../Components/Bento";
import Testimonials from '../Components/Testimonials';
import ProductCarousel from "../Components/ProductCarousel"

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user state
    }
  }, []);

  return (
    <>
      <Carousel />
      <Bento />
      <ProductCarousel/>
      <Testimonials/>

    </>
  );
};

export default HomePage;
