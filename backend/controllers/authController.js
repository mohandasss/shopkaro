const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  try {
   

    const { name, email, password, address, role, phone } = req.body;

    // Check if any required field is missing
    if (!name || !email || !password || !phone) {
      console.log("Missing required fields"); // Debug missing fields
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered"); // Debug duplicate email
      return res.status(400).json({ error: "Email already registered" });
    }

    const userRole = role || "customer";
    const newUser = await User.create({
      name,
      email,
      password,
      address,
      phone,
      role: userRole,
    });

    console.log("User registered successfully:", newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error:", error); // Debug error messages
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
