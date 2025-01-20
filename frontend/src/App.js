import React from "react";
import { Routes, Route } from "react-router-dom"; // No need for BrowserRouter here
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./Components/Productsdetails";
import WistlistPage from "./pages/WistlistPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<WistlistPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
