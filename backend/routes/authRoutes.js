// routes/authRoutes.js
const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { registerUser, loginUser,resetPassword } = require('../controllers/authController');
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware")
const upload = require('../config/multer');
const router = express.Router();

router.get('/users',authMiddleware,authorizeRoles, getAllUsers); // Get all users
router.put('/users/:id',authMiddleware,authorizeRoles, updateUser); // Update user (role)
router.delete('/users/:id',authMiddleware,authorizeRoles, deleteUser);
router.post('/register', upload.single('profileImage'), async (req, res) => {
    console.log('Body:', req.body); // Logs form data except the file
    console.log('File:', req.file); // Logs uploaded file info
  
    try {
      await registerUser(req, res);
    } catch (err) {
      console.error('Error in /register route:', err.message);
      res.status(500).json({ error: err.message });
    }
  });
  
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

module.exports = router;
