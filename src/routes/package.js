const { validate } = require('express-validation');
const PackageController = require('../controllers/PackageController');
const router = require('express').Router();
const { isAuth } = require('../utils/authUtils');
router.post('/',isAuth, PackageController.create);
router.post('/one',isAuth, PackageController.find);
router.get('/',isAuth, PackageController.findAll);
router.put('/',isAuth, PackageController.update);
router.delete('/',isAuth, PackageController.delete);


module.exports = router;