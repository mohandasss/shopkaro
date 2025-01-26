import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/wishlist';

export const addToWishlist = async (userId, productId) => {
  try {
    const token = localStorage.getItem('token'); // Ensure the token is fetched
    const payload = { userId, productId };

    const response = await axios.post(`${BASE_URL}/add`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token for authentication
      },
    });
   
    return response.data;
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    throw new Error('Unable to add product to wishlist');
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const token = localStorage.getItem('token');
    const payload = { userId, productId };

    const response = await axios.delete(`${BASE_URL}/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload, // Pass the payload in the body
    });

    
    return response.data;
  } catch (error) {
    console.error('Error removing product from wishlist:', error.response?.data || error.message);
    throw new Error('Unable to remove product from wishlist');
  }
};

export const getWishlist = async (userId) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error.response?.data || error.message);
    throw new Error('Unable to fetch wishlist');
  }
};
