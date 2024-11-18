// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, removeFromCart,updateCart,checkoutCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart); // Add item to cart
router.get('/:userId', getCart); // Get cart by user ID
router.delete('/remove', removeFromCart); // Remove item from cart
router.put('/update/:userId', updateCart);
router.post('/checkout/:userId', checkoutCart);
module.exports = router;
