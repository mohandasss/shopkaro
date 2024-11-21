const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');  // Import your Cloudinary configuration

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Use the Cloudinary config
  params: {
    folder: 'user_uploads',  // Folder in Cloudinary to save the images
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed formats
  },
});

// Initialize multer with Cloudinary storage
const upload = multer({ storage: storage });

module.exports = upload;
