const User = require('../models/User');

// Update user profile details
const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, address }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user profile details
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user address
const updateUserAddress = async (req, res) => {
  const { address } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.address = address;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserProfile, updateUserAddress, getUserProfile };
