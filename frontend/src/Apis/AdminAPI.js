import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/admin'; // Update with your backend API's admin route base URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up Authorization header with JWT token if it's available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Fetch dashboard data
const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Fetch all users
const fetchTotalUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      return response.data.length; // Assuming the response is an array of users
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  

// Update a user's role
const updateUserRole = async (userId, roleData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

// Delete a user
const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Export all functions at the end
export { fetchDashboardData, fetchTotalUsers, updateUserRole, deleteUser };
