const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');
const { adminDashboard, getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');

const router = express.Router();

// Admin-specific routes
router.get('/dashboard', authMiddleware, authorizeRoles('admin'), adminDashboard);
router.get('/users', authMiddleware, authorizeRoles('admin'), getAllUsers); 
router.put('/users/:id', authMiddleware, authorizeRoles('admin'), updateUser);
router.delete('/users/:id', authMiddleware, authorizeRoles('admin'), deleteUser);

module.exports = router;
