const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('x-api-key');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if decoded id exists
    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    // Find user by ID and exclude password from result
    req.user = await User.findById(decoded.id).select('-password');
    
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('Authentication error:', err); // Log the error for debugging
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
