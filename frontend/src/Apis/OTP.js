import axios from 'axios';
 
 export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});



// Send OTP API call
export const sendOtp = async (phone) => {
    phone = `+91${phone}`
    console.log(phone);
    
  try {
    const response = await axiosInstance.post('/otp/send-otp', { phone });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error.response?.data || error.message);
    throw error;
  }
};

// Verify OTP API call
export const verifyOtp = async (phone, otp) => {
   phone = `+91${phone}`
   otp = otp.join("");
   console.log(phone,otp);
   
   
  try {
    const response = await axiosInstance.post('/otp/verify-otp', { phone, otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error.response?.data || error.message);
    throw error;
  }
};
