const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  // Get token from the Authorization header (Assumes it's in "Bearer <token>" format)
  const token = req.headers.authorization?.split(' ')[1];
  
  // If no token is provided, respond with a 401 Unauthorized error
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user associated with the decoded token (excluding the password field)
    req.user = await User.findById(decoded.id).select('-password');
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors (invalid or expired token)
    res.status(401).json({ error: 'Invalid token' });
  }
};


const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: insufficient permissions' });
    }
    next();
  };
};

module.exports = { authMiddleware, authorizeRoles };
