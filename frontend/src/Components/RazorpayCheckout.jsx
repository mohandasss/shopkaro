import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getLoggedInUserProfile } from '../Apis/userAPI';

const RazorpayCheckout = ({ totalAmount, cartItems }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Dynamically load Razorpay script
  useEffect(() => {

    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => setRazorpayLoaded(true); // Set loaded state to true once script is loaded
      script.onerror = () => console.error("Error loading Razorpay script");
      document.body.appendChild(script);
    };

    loadRazorpayScript(); // Load Razorpay script on component mount
  }, []);

  const createOrder = async () => {
    if (!razorpayLoaded) {
      console.error("Razorpay script not loaded");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/payments/create-order", {
        amount: totalAmount
      });

      const userdata = await getLoggedInUserProfile();
      const { id, currency, amount: orderAmount } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        name: "Shopkaro",
        description: `Order for ₹${totalAmount}`,
        order_id: id,
        handler: async function (paymentResponse) {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;
            const orderData = {
              userId: userdata._id,
              items: cartItems,
              totalAmount,
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            };

            const orderResponse = await axios.post('http://localhost:5000/api/orders/place-order', orderData);
            console.log('Order placed:', orderResponse.data);

            
            window.location.href = '/';
          } catch (error) {
            console.error("Error placing order:", error);
          }
        },
        prefill: {
          name: userdata.name,
          email: userdata.email,
        },
        notes: {
          cartDetails: JSON.stringify(cartItems),
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  return (
    <div>
      <button onClick={createOrder} disabled={!razorpayLoaded}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default RazorpayCheckout;
