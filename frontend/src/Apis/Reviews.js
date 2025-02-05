import axios from "axios";

// Base URL for the product API
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/products", // Change this to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the JWT token (assuming it's stored in localStorage)
const getToken = () => {
  return localStorage.getItem('token'); // Modify as needed to retrieve the token
};

// Add a Review
export const addReview = async ({ ProductId, userId, rating, comment }) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically

    const response = await axiosInstance.post(`/reviews/${ProductId}`, {
      rating,
      comment,
      userId,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

// Get Reviews
export const getReviews = async (productId) => {
  try {
    const response = await axiosInstance.get(`/reviews/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// Update Review
export const updateReview = async (productId, reviewId, userId, rating, comment) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically

    const response = await axiosInstance.put(`/${productId}/reviews`, {
      reviewId,
      userId,
      rating,
      comment,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Delete Review
export const deleteReview = async (productId, reviewId, userId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically

    const response = await axiosInstance.delete(`/products/${productId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: { reviewId, userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
