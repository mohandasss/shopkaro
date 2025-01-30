const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, address, role, phone } = req.body;
  console.log(phone);
  const phoneNumber  = phone.toString();

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const userRole = role || 'customer';

    const newUser = await User.create({
      name,
      email,
      password,
      address,
      phoneNumber, 
      role: userRole,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate reset token (this can be sent to email)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Password reset token generated', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { registerUser, loginUser ,resetPassword};
