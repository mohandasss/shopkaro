// routes/razorpayRoutes.js
const express = require("express");
const { createOrder } = require("../controllers/razorpayController");
const router = express.Router();

// Route to create Razorpay order
router.post("/create-order", createOrder);

module.exports = router;
