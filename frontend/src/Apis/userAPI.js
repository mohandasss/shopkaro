import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Base URL for the API
const BASE_URL = 'http://localhost:5000/api/users/';

// ------------------------ API Calls ------------------------

// Get logged-in user's profile
const getLoggedInUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');  // Get the JWT token from localStorage
    if (!token) {
      throw new Error('No token found, please login');
    }
    
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach the token to the request header
      },
    });
    
    console.log();
    
    return response.data;  // Return user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;  // Rethrow error to be handled by the calling component 
  }
};

// Get user profile by ID
const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}${userId}`);
    return response.data;  // Return user profile data
  } catch (error) {
    console.error('Error fetching user profile by ID:', error);
    throw error;
  }
};

// Update user profile
const updateUserProfile = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem('token');  // Get the JWT token from localStorage
    if (!token) {
      throw new Error('No token found, please login');
    }

    const response = await axios.put(
      `${BASE_URL}update/${userId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach the token to the request header
        },
      }
    );

    return response.data;  // Return updated user data
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;  // Rethrow error to be handled by the calling component
  }
};

// Export all functions using ES6 syntax
export { getLoggedInUserProfile, getUserProfile, updateUserProfile };
