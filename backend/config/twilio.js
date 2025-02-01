// config/twilio.js
module.exports = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromPhoneNumber: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
  };
  