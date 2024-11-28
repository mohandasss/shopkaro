import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Utility function to get the token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Search Products and Categories
const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Unable to search products');
  }
};

// Add a new Product
const addProduct = async (productData) => {
  if (!productData) throw new Error('Product data is required');
  try {
    const response = await axiosInstance.post('/add', productData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Unable to add product');
  }
};

// Get All Products
const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Unable to fetch products');
  }
};

// Get Product By Id
const getProductById = async (productId) => {
  if (!productId) throw new Error('Product ID is required');
  try {
    const response = await axiosInstance.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw new Error('Unable to fetch product by ID');
  }
};

// Update Product
const updateProduct = async (productId, updatedData) => {
  if (!productId || !updatedData) throw new Error('Product ID and updated data are required');
  try {
    const response = await axiosInstance.put(`/${productId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Unable to update product');
  }
};

// Delete Product
const deleteProduct = async (productId) => {
  if (!productId) throw new Error('Product ID is required');
  try {
    const response = await axiosInstance.delete(`/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Unable to delete product');
  }
};

export {
  searchProducts,
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
