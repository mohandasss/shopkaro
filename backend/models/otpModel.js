// models/otpModel.js
const otpStore = {};  // Temporary in-memory storage

const storeOtp = (phoneNumber, otp) => {
  otpStore[phoneNumber] = otp;
};

const verifyOtp = (phoneNumber, otp) => {
  if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
    return true;
  }
  return false;
};

module.exports = { storeOtp, verifyOtp };
