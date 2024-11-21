import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage'; // Example: A Signup page
import HomePage from "./pages/HomePage"
import Navbar from './Components/Navbar'; // Ensure the path is correct relative to `App.js`

function App() {
  return (
    <div className="App">
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Default route */}
        <Route path="/register" element={<RegisterPage />} /> {/* Signup route */}
      </Routes>
    </div>
  );
}

export default App;
