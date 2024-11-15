// routes/productRoutes.js
const express = require('express');
const { addProduct, getAllProducts, getProductById } = require('../controllers/productController');
const router = express.Router();

router.post('/add', addProduct); // Add product
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID

module.exports = router;
