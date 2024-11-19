const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, search } = require('../controllers/productController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Product management
router.post('/add', authMiddleware, authorizeRoles('admin'), addProduct); 
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateProduct);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteProduct);
router.get('/search', search);

module.exports = router;
