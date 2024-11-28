import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}); 

// Search Products and Categories
export const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Add a new Product
export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/add', productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token stored in localStorage
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Get All Products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data; // List of all products
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Get Product By Id
export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/${productId}`);
    return response.data; // A single product's details
  } catch (error) {
    console.error('Error fetching product by id:', error);
    throw error;
  }
};

// Update Product
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axiosInstance.put(`/${productId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; // Updated product data
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete Product
export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data; // Success message after deleting
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export { searchProducts,addProduct,getAllProducts,getProductById,deleteProduct,updateProduct };


