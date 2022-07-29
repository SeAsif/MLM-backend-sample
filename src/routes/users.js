const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isAuth } = require('../utils/authUtils');
const { upload } = require('../utils/imageUpload');

// Find One
router.get('/:email', UserController.find);

// Find All
router.get('/', isAuth, UserController.all);

// Create User
router.post('/', UserController.create);

// Update User
router.put('/', isAuth, UserController.updateSettings);

//Update Avatar
router.patch('/', isAuth, upload.single('avatar'), UserController.updateAvatar);

module.exports = router;
