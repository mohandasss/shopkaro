const express = require('express');
const { placeOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Order management
router.post('/place', authMiddleware, placeOrder);
router.get('/:userId', authMiddleware, getUserOrders);
router.put('/:id/status', authMiddleware, authorizeRoles('admin'), updateOrderStatus);

module.exports = router;
