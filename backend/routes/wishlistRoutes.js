const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Wishlist management
router.post('/add', authMiddleware, addToWishlist);
router.get('/:userId', authMiddleware, getWishlist);
router.delete('/remove', authMiddleware, removeFromWishlist);

module.exports = router;
