const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const auth = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user by ID - protected route
// Requires authentication and authorization (e.g., 'user' role)
router.get('/:id',auth, authorize(['user', 'admin']), userController.getUser);

//get user by id for navbar
router.get('/nav/:id', userController.getUser);

// Update user - protected route
// Requires authentication and authorization (e.g., 'user' role)
router.put('/:id', userController.updateUser);

// Delete user - protected route
// Requires authentication and authorization (e.g., 'admin' role)
router.delete('/:id', auth, authorize(['admin']), userController.deleteUser);

module.exports = router;
