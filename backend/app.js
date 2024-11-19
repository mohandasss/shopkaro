const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importing route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');  // New route
const reviewRoutes = require('./routes/reviewRoutes');      // New route
const wishlistRoutes = require('./routes/wishlistRoutes');  // New route

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Global middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);           // Authentication routes
app.use('/api/products', productRoutes);    // Product management
app.use('/api/cart', cartRoutes);           // Cart management
app.use('/api/orders', orderRoutes);        // Order management
app.use('/api/users', userRoutes);          // User profile and address management
app.use('/api/admin', adminRoutes);         // Admin-specific routes
app.use('/api/categories', categoryRoutes); // Product categories
app.use('/api/products/reviews', reviewRoutes);      // Product reviews
app.use('/api/wishlist', wishlistRoutes);   // Wishlist management

// Export the app instance
module.exports = app;
