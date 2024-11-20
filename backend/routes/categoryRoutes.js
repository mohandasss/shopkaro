const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory, getProductsByCategory } = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Category management
router.get('/', getAllCategories);
router.post('/', authMiddleware, authorizeRoles('admin'), addCategory);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateCategory);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteCategory); 
router.get('/:categoryId', getProductsByCategory); // Updated route

module.exports = router;
