import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Not authorized, invalid token" });
    }

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: "Not authorized" });
  }
}; 