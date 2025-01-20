import React, { useState, useEffect } from "react";
import axios from "axios";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import { placeOrder } from "../Apis/orderAPI"; // Adjust the path accordingly
import { removeAllFromCart } from "../Apis/cartAPI";

const RazorpayCheckout = ({ totalAmount, cartItems }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(cartItems);

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

    setLoading(true); // Start loading state
    try {
      const response = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          amount: totalAmount,
        }
      );

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
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = paymentResponse;

            const orderData = {
              userId: userdata._id,
              items: cartItems,
              totalAmount,
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            };
            console.log("Order Data to be sent:", orderData);

            const orderResponse = await placeOrder(orderData);
            console.log("Order placed:", orderResponse.data);
            
            const emptycart = await removeAllFromCart(userdata._id);
            console.log(emptycart);

            window.location.href = "/";
          } catch (error) {
            console.error("Error placing order:", error);
            alert("An error occurred while placing your order.");
          } finally {
            setLoading(false); // Stop loading state
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
      alert("An error occurred while creating the order.");
      setLoading(false); // Stop loading state on error
    }
  };

  return (
    <div>
      {totalAmount > 61 && (
        <button
          onClick={createOrder}
          disabled={!razorpayLoaded || loading}
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      )}
    </div>
  );
};

// Default export
export default RazorpayCheckout;
