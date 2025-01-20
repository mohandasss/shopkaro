import axios from 'axios';

// Base URL for the orders API
const BASE_URL = 'http://localhost:5000/api/orders/';

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

// Function to place an order
const placeOrder = async ({userId, items, totalAmount, razorpay_payment_id, razorpay_order_id, razorpay_signature}) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically

    const orderData = {
      userId,
      items,
      totalAmount,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    };

    const response = await axiosInstance.post('/place', orderData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });

    console.log('Order placed:', response.data);
    return response.data; // Returns the created order details
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Function to get the orders for a specific user
const getUserOrders = async (userId) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });
    return response.data; // Returns the user's orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to update the order status
const updateOrderStatus = async (orderId, status) => {
  try {
    const token = getToken(); // Fetch the JWT token dynamically
    const response = await axiosInstance.put(`/status/${orderId}`, { status }, {
      headers: {
        'Authorization': `Bearer ${token}`, // Add token dynamically
      },
    });
    console.log('Order status updated:', response.data);
    return response.data; // Returns the updated order details
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export { placeOrder, getUserOrders, updateOrderStatus };
