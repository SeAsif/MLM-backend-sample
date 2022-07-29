const router = require('express').Router();
const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.signIn);
router.post('/register', AuthController.signUp);
router.get('/logout', AuthController.signOut);
router.get('/refresh_token', AuthController.genRefreshToken);

module.exports = router;
