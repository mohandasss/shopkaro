import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth';

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

const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

const login = async (loginData) => {
  try {
    const response = await axiosInstance.post('/login', loginData);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

const resetPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const updateUserRole = async (userId, roleData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, roleData);
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Export all functions at the endd
export { register, login, resetPassword, getAllUsers, updateUserRole, deleteUser };