const express = require('express');
const { addToCart, getCart, removeFromCart, updateCart, checkoutCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Cart routes
router.post('/add', authMiddleware, addToCart); 
router.get('/:userId', authMiddleware, getCart); 
router.delete('/remove', authMiddleware, removeFromCart); 
router.put('/update/:userId', authMiddleware, updateCart);
router.post('/checkout/:userId', authMiddleware, checkoutCart);

module.exports = router;
