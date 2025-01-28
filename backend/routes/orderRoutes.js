const express = require('express');
const {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatusAdmin,
  getUserOrders,
  getTotalOrdersCount,
  getTotalSales
} = require('../controllers/orderController');
const { authMiddleware, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

// Order management routes
router.post('/place', authMiddleware, placeOrder);
router.get('/:userId', authMiddleware, getUserOrders);  // Get orders by userId

// Admin-only routes
router.get('/admin/orders', authMiddleware, authorizeRoles('admin'), getAllOrders);  // Get all orders for admin
router.get('/admin/orders/:id', authMiddleware, authorizeRoles('admin'), getOrderById);  // Get a specific order by ID for admin
router.put('/admin/orders/:id/status', authMiddleware, authorizeRoles('admin'), updateOrderStatusAdmin);  // Update order status by admin
router.get('/admin/total-orders', authMiddleware, authorizeRoles('admin'), getTotalOrdersCount);  // Get total orders count for admin
router.get('/admin/total-sales', authMiddleware, authorizeRoles('admin'), getTotalSales);  // Get total sales for admin

module.exports = router;