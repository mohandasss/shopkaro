// controllers/orderController.js
const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      status: 'Pending',
    });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateOrderStatus = async (req, res) => {
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



module.exports = {
  placeOrder,
  getUserOrders,
  updateOrderStatus
};
