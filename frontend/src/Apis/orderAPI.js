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

// Add an Axios interceptor to add the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token dynamically
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to place an order
const placeOrder = async ({ userId, items, totalAmount, razorpay_payment_id, razorpay_order_id, razorpay_signature }) => {
  try {
    const orderData = {
      userId,
      items,
      totalAmount,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    };

    const response = await axiosInstance.post('/place', orderData);
    return response.data; // Returns the created order details
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

// Function to get the orders for a specific user
const getUserOrders = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`); // Use the correct path
    return response.data; // Returns the user's orders
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Function to update the order status by admin
const updateOrderStatusAdmin = async (orderId, status) => {
  try {
    const response = await axiosInstance.put(`/admin/orders/${orderId}/status`, { status });
    return response.data; // Returns the updated order details
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Function to get all orders (admin access)
const getAllOrders = async () => {
  try {
    const response = await axiosInstance.get('/admin/orders');
    return response.data; // Returns all orders
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Function to get the total count of orders (admin access)
const getTotalOrdersCount = async () => {
  try {
    const response = await axiosInstance.get('/admin/total-orders');
    return response.data; // Returns total orders count
  } catch (error) {
    console.error('Error fetching total orders count:', error);
    throw error;
  }
};

// Function to get total sales (admin access)
const getTotalSales = async () => {
  try {
    const response = await axiosInstance.get('/admin/total-sales');
    return response.data; // Returns total sales
  } catch (error) {
    console.error('Error fetching total sales:', error);
    throw error;
  }
};



 const getOrderById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`admin/orders/${orderId}`,);
    console.log(response.data);
      
    return response.data; // Return the order data
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

export {
  placeOrder,
  getUserOrders,
  updateOrderStatusAdmin,
  getAllOrders,
  getTotalOrdersCount,
  getTotalSales,
  getOrderById
};
