// controllers/otpController.js
const { storeOtp, verifyOtp } = require('../models/otpModel');
const { sendOtp } = require('../service/twilioservice');

// Send OTP function
const sendOtpController = async (req, res) => {
  const { phone } = req.body;

  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  try {
    // Save OTP to memory (or database)
    storeOtp(phone, otp);

    // Send OTP via Twilio
    await sendOtp(phone, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Verify OTP function
const verifyOtpController = (req, res) => {
  const { phone, otp } = req.body;
    console.log(phone,otp);

  const isOtpValid = verifyOtp(phone, otp);

  if (isOtpValid) {
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};

module.exports = { sendOtpController, verifyOtpController };
