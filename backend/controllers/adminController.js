
const Order = require('../models/Order'); 

const User = require('../models/User'); 

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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    
    
  } catch (error) {
    res.status(50).json({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getAllUsers, updateUser, deleteUser,adminDashboard };