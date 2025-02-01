const express = require('express');
const { findUserByMobile,getUserProfile,getLoggedInUserProfile, updateUserProfile, updateUserAddress } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// User profile and address management
router.get('/profile',authMiddleware, getLoggedInUserProfile);
router.put('/:id', authMiddleware, updateUserProfile);
router.put('/:id/address', authMiddleware, updateUserAddress);
router.post('/bynumber', findUserByMobile);


module.exports = router;
