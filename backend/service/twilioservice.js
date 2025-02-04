// services/twilioService.js
const { Twilio } = require('twilio');
const { accountSid, authToken, fromPhoneNumber } = require('../config/twilio');

const twilioClient = new Twilio(accountSid, authToken);

const sendOtp = async (phoneNumber, otp) => {
  try {
    const message = await twilioClient.messages.create({
      body: `Your Shopkaro OTP is: ${otp}`,
      from: fromPhoneNumber,
      to: phoneNumber,
    });
    return message;
  } catch (error) {
    throw new Error('Failed to send OTP');
  }
};

module.exports = { sendOtp };
