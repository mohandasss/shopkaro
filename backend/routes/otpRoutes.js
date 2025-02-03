// routes/otpRoutes.js
const express = require('express');
const { sendOtpController, verifyOtpController } = require('../controllers/otpController');
const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOtpController);

// Route to verify OTP
router.post('/verify-otp', verifyOtpController);

module.exports = router;

//otp routes
//few are working 