const otpStore = {};  // Temporary in-memory storage

const storeOtp = (phone, otp) => {
  otpStore[phone] = otp.toString();  // Store OTP as string for consistent comparison
  console.log("Stored OTP:", otpStore); // Debugging: Log stored OTPs
};

const verifyOtp = (phone, otp) => {
  console.log(`Checking OTP for ${phone}: Received=${otp}, Stored=${otpStore[phone]}`);
  return otpStore[phone] && otpStore[phone] === otp.toString(); // Ensure type consistency
};

module.exports = { storeOtp, verifyOtp };
