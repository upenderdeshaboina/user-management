const express = require('express');
const router = express.Router();
const { signup, login, getCurrentUser } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('full_name', 'Full name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.get('/me', auth, getCurrentUser);
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out' });
});

module.exports = router;
