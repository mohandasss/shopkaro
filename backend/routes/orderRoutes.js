// routes/orderRoutes.js
const express = require('express');
const { placeOrder, getUserOrders,updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/place', placeOrder); // Place an order
router.get('/:userId', getUserOrders); // Get orders by user ID
router.put('/:id/status', authMiddleware, authorizeRoles('admin'), updateOrderStatus);

module.exports = router;
