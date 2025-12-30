const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header (support both Authorization: Bearer and x-auth-token)
  let token = req.header('Authorization');
  
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7);
  } else {
    token = req.header('x-auth-token');
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
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

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { auth, admin };
