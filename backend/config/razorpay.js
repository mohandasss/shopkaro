// config/razorpay.js
const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Razorpay Key ID from your dashboard
  key_secret: process.env.RAZORPAY_SECRET_KEY, // Razorpay Secret Key from your dashboard
});

module.exports = razorpay;
