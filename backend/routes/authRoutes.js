// routes/authRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { registerUser, loginUser,resetPassword } = require('../controllers/authController');
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware")

const router = express.Router();

router.get('/users',authMiddleware,authorizeRoles, getAllUsers); // Get all users
router.put('/users/:id',authMiddleware,authorizeRoles, updateUser); // Update user (role)
router.delete('/users/:id',authMiddleware,authorizeRoles, deleteUser);
router.post('/register', registerUser)
  
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

module.exports = router;
