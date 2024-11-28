const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    res.json({message :"Address sucessfully updated",user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLoggedInUserProfile = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized. Token missing.' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch the user data from the database
    const user = await User.findById(userId).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Send the user data as a response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { updateUserProfile,getLoggedInUserProfile, updateUserAddress, getUserProfile };
