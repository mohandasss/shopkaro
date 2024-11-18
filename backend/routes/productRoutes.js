// routes/productRoutes.js
const express = require('express');
const { addProduct, getAllProducts, getProductById,updateProduct,deleteProduct,searchProducts } = require('../controllers/productController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');
const router = express.Router();

// Apply the authMiddleware and authorizeRoles middleware to restrict access to admins only
router.post('/add', authMiddleware, authorizeRoles('admin'), addProduct); // Add product (only admin)
router.get('/', getAllProducts); // Get all products (available to all users)
router.get('/:id', getProductById); // Get product by ID (available to all users)
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateProduct);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProduct);
router.get('/search', searchProducts);
module.exports = router;
