const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const router = require('express').Router(); // Add parentheses to Router

// Login route (placeholder for now)

// Signup route with validation middleware
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);


// Export the router object correctly
module.exports = router;
