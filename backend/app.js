const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

// Importing route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');  
const reviewRoutes = require('./routes/reviewRoutes');      
const wishlistRoutes = require('./routes/wishlistRoutes');  
const feedbackRoutes = require('./routes/feedbackRoutes');  // Add this line

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();
app.use(express.urlencoded({ extended: true }));

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs HTTP requests
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// API Routes
app.use('/api/auth', authRoutes);           
app.use('/api/products', productRoutes);    
app.use('/api/cart', cartRoutes);           
app.use('/api/orders', orderRoutes);        
app.use('/api/users', userRoutes);          
app.use('/api/admin', adminRoutes);         
app.use('/api/categories', categoryRoutes); 
app.use('/api/products/reviews', reviewRoutes);      
app.use('/api/wishlist', wishlistRoutes);   
app.use('/api/feedback', feedbackRoutes);  // Add feedback route here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Export the app instance
module.exports = app;
