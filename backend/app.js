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
const razorpayRoutes = require("./routes/razorpayRoutes");
const otpRoutes = require('./routes/otpRoutes');
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

// Handle preflight requests
app.options('*', cors()); // Respond to preflight requests for all routes

// Global middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logs HTTP requests
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  if (req.method === 'OPTIONS') {
    console.log('Preflight request detected');
  }
  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
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
app.use("/api/payments", razorpayRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/feedback', feedbackRoutes);
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
