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

module.exports = {
  placeOrder,
  getUserOrders,
};
