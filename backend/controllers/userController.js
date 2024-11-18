const User = require('../models/User');

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

module.exports = { updateUserProfile };
