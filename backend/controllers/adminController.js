// controllers/adminController.js
const Order = require('../models/Order'); // Add this if it's not imported already

const adminDashboard = async (req, res) => {
  try {
      const totalOrders = await Order.countDocuments();
      const totalSales = await Order.aggregate([
          { $match: { status: 'Completed' } },
          { $group: { _id: null, total: { $sum: '$total' } } },
      ]);

      res.json({
          totalOrders,
          totalSales: totalSales[0] ? totalSales[0].total : 0,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = adminDashboard; // Export as a function directly
