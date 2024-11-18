const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Wishlist management
router.post('/', authMiddleware, addToWishlist);
router.get('/:userId', authMiddleware, getWishlist);
router.delete('/', authMiddleware, removeFromWishlist);

module.exports = router;
