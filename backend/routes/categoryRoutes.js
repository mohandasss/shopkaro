const express = require('express');
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Category management
router.get('/', getAllCategories);
router.post('/', authMiddleware, authorizeRoles('admin'), addCategory);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateCategory);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteCategory);

module.exports = router;
