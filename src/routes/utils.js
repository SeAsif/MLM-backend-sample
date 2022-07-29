const router = require('express').Router();
const UtilsController = require('../controllers/UtilsController');

// Send Reset Password Email
//router.post('/password-recovery', UtilsController.passwordRecoveryEmailAPI);

// Update Password
router.post('/reset-password', UtilsController.resetPasswordAPI);

// Add user to Forgot Password List
router.get('/forgot-password/:email', UtilsController.addUserToForgotPasswordList);

module.exports = router;
