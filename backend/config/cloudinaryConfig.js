const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dk5gtjb3k',  // Your Cloud name
  api_key: '835948988735136',  // Your API key
  api_secret: 'BYNK24_Opz-Ns2T0jq6vIKc4jvQ',  // Your API secret
});
module.exports = cloudinary;