import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Loader from "./Components/Loader";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./Components/Productsdetails";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Simulate loading state on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200); // Simulated delay
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="App">
      {loading && <Loader />}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
