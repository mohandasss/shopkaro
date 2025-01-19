// controllers/razorpayController.js
const razorpay = require("../config/razorpay");

// Function to create an order
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount should be in paise (i.e., 100 = ₹1)

    // Order options
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1, // 1 means automatic payment capture
    };

    // Create order
    const order = await razorpay.orders.create(options);
    return res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createOrder };
