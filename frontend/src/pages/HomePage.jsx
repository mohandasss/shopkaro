import React, { useState, useEffect } from 'react';
import Carousel from "../Components/Carousel";
import Bento from "../Components/Bento";
import Testimonials from '../Components/Testimonials';
import ProductCarousel from "../Components/ProductCarousel"
import Feedback from '../Components/Feedback';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); 
    }
    
  }, []);

  return (
    <>
      <Carousel />
      <Bento />
      <ProductCarousel/>
      <Testimonials/>
      <Feedback/>
    </>
  );
};

export default HomePage;
