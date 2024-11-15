// routes/orderRoutes.js
const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/place', placeOrder); // Place an order
router.get('/:userId', getUserOrders); // Get orders by user ID

module.exports = router;
