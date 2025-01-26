import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/categories';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});










const getProductsById = async(categoriesId)=>{
            try {
                const categories =await axiosInstance.get(`/${categoriesId}`)
                
                
                return categories.data
            } catch (error) {
               
                throw new Error('Catogies not availbe');
            }


}

export default {
getProductsById
  };
  