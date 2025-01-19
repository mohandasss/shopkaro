// Frontend Example for Creating Razorpay Order
import React, { useState } from 'react';
import axios from 'axios';

const RazorpayCheckout = () => {
  const [amount, setAmount] = useState(100); // Example amount in INR

  // Create order API call
  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create-order', {
        amount: amount, // Amount in INR (without conversion to paise)
      });

      const { id, currency, amount: orderAmount } = response.data;

      // Trigger the Razorpay checkout
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay key ID from env
        amount: orderAmount, // The amount (in paise)
        currency: currency,
        name: "Your Company Name",
        description: "Test Payment",
        order_id: id,
        handler: function (response) {
          console.log("Payment successful", response);
          // Here you can make an API call to your server to verify the payment if needed
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Hello World",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open(); // Open the Razorpay popup

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  return (
    <div>
      <button onClick={createOrder}>Pay with Razorpay</button>
    </div>
  );
};

export default RazorpayCheckout;
