const Order = require('../models/Order');

// Place a new order
const placeOrder = async (req, res) => {
  const { userId, items, totalAmount, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: 'Pending',
      razorpay_payment_id,  // Added razorpay payment ID
      razorpay_order_id,     // Added razorpay order ID
      razorpay_signature     // Added razorpay signature
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update the order status by admin (e.g., 'Shipped', 'Delivered', etc.)
const updateOrderStatusAdmin = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders placed by a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the total number of orders placed
const getTotalOrdersCount = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the total sales amount from all completed orders
const getTotalSales = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $match: { status: 'Completed' } },
      { $group: { _id: null, totalAmount: { $sum: '$totalAmount' } } }
    ]);
    res.json({ totalSales: totalSales[0]?.totalAmount || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporting all the functions to be used in routes
module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatusAdmin,
  getUserOrders,
  getTotalOrdersCount,
  getTotalSales
};