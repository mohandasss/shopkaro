const express = require('express');
const { getUserProfile, updateUserProfile, updateUserAddress } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// User profile and address management
router.get('/:id', authMiddleware, getUserProfile);
router.put('/:id', authMiddleware, updateUserProfile);
router.put('/:id/address', authMiddleware, updateUserAddress);

module.exports = router;
