const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontrollers');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Admin login
router.post('/login', adminController.login);

// Get admin by ID (protected by authentication and authorization)
router.get('/:id', auth, authorize(['admin']), adminController.getAdmin);

// Update admin details by ID (protected by authentication and authorization)
// router.put('/:id', auth, authorize(['admin']), adminController.updateAdmin);

// Delete admin by ID (protected by authentication and authorization)
// router.delete('/:id', auth, authorize(['admin']), adminController.deleteAdmin);

module.exports = router;
