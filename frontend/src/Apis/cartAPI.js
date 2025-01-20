import axios from 'axios';

// Base URL for the cart API
const BASE_URL = 'http://localhost:5000/api/cart/';

// Function to get the JWT token (assuming it's stored in localStorage)
const getToken = () => {
  return localStorage.getItem('token'); // Modify as needed to retrieve the token
};

// Create an Axios instance with base URL and headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to add an item to the cart
const addToCart = async (userId, productId, quantity) => {
  
  

  try {
    const token = getToken(); // Fetch the JWT token dynamically
    console.log(token);
    
    const payload = { userId, productId, quantity };
    console.log(payload);
    
    

    const response = await axiosInstance.post('/add', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log('Item added to cart:', response.data);
    return response.data; // Returns updated cart
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};


// Function to get the cart details for a specific user
const getCart = async (userId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.get(`/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });
    return response.data; // Returns the user's cart
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Function to remove an item from the cart
const removeFromCart = async (userId, productId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.delete('/remove', {
      data: { userId, productId },
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });
   
    return response.data; // Returns the updated cart
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

// Function to update the quantity of an item in the cart
const updateCart = async (userId, productId, quantity) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.put(
      `/update/${userId}`,
      { productId, quantity },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add token dynamically
        },
      }
    );
    console.log('Cart updated:', response.data);
    return response.data; // Returns updated cart
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

// Function to handle the checkout process
const checkoutCart = async (userId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.post(`/checkout/${userId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });
    console.log('Checkout successful:', response.data);
    return response.data; // Returns order details
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

const removeAllFromCart = async (userId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    console.log(userId);
    
    const response = await axiosInstance.delete(
      'http://localhost:5000/api/cart/emptycart', // URL of the backend endpoint
      {
        data: { userId }, // Send the userId inside the 'data' object
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the headers
        },
      }
    );

    console.log('All items removed from cart:', response.data);
    return response.data; // Optionally return the updated cart data
  } catch (error) {
    console.error('Error removing items from cart:', error);
    alert('An error occurred while removing items from the cart.');
  }
};


export { addToCart, getCart,removeAllFromCart, removeFromCart, updateCart, checkoutCart };
