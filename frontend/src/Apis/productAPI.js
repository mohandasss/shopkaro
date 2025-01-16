import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/products/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


const OK = 'http://localhost:5000/api/categories/';

const axiosOK = axios.create({
  baseURL: OK,
  headers: {
    'Content-Type': 'application/json',
  },
});





// Utility function to get the token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Search Products and Categories
export  const searchProducts = async (query) => {
  try {
    const response = await axiosInstance.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Unable to search products');
  }
};

// Add a new Product
export  const addProduct = async (productData) => {
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
export  const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Unable to fetch products');
  }
};

export  const getAllProductsAtOnce = async () => {
  try {
    const response = await axiosInstance.get('/getall');
    
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw new Error('Unable to fetch products');
  }
};



// Get Product By Id
// Get Category By Id
export const getCategoryById = async (categoryId) => {
  if (!categoryId) throw new Error('Category ID is required');
  try {
    const response = await axiosOK.get(`/${categoryId}`);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error.response || error.message);
    throw new Error('Unable to fetch category by ID');
  }
};


// Update Product
export  const updateProduct = async (productId, updatedData) => {
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
export  const deleteProduct = async (productId) => {
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

 export const getAllCategories = async()=>{
  try {
      const categories =await axiosOK.get(`/`)
    
      return categories.data
  } catch (error) {
     
      throw new Error('Catogies not availbe');
  }


}


