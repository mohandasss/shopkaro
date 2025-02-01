// middlewares/validateOtp.js
const validateOtp = (req, res, next) => {
    const { phone, otp } = req.body;
  
    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
  
    // Add further validation like checking phone number format if necessary
    next();
  };
  
  module.exports = validateOtp;
  