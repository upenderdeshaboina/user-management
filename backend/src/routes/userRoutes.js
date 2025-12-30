const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserStatus, updateProfile, changePassword } = require('../controllers/userController');
const { auth, admin } = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const validateProfileUpdate = [
  check('full_name', 'Full name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validatePasswordChange = [
  check('currentPassword', 'Current password is required').not().isEmpty(),
  check('newPassword', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Admin routes
router.get('/', auth, admin, getAllUsers);
router.patch('/:id/status', auth, admin, updateUserStatus);

// User routes - note: updateProfile uses auth to get user ID from token
router.put('/profile', auth, validateProfileUpdate, updateProfile);
router.put('/password', auth, validatePasswordChange, changePassword);

module.exports = router;
