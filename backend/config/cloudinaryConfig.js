const cloudinary = require('cloudinary').v2;

// Replace with your own Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME , // your cloud name
    api_key:process.env.API_KEY , // your api key
    api_secret: process.env.API_SECRET, // your api secret
});

module.exports = cloudinary;
