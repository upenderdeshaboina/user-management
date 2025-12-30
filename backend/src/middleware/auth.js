const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  let token = null;

  // 1. Check Authorization: Bearer <token>
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // 2. Fallback to x-auth-token
  if (!token) {
    token = req.header('x-auth-token');
  }

  // No token found
  if (!token) {
    return res
      .status(401)
      .json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// admin access middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { auth, admin };
