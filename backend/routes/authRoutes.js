// routes/authRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { registerUser, loginUser,resetPassword } = require('../controllers/authController');
const router = express.Router();

router.get('/users', getAllUsers); // Get all users
router.put('/users/:id', updateUser); // Update user (role)
router.delete('/users/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

module.exports = router;
