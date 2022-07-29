const { validate } = require('express-validation');
const FileUploadController = require('../controllers/FileUploadController');
const router = require('express').Router();
const { upload } = require('../utils/imageUpload');
const { isAuth } = require('../utils/authUtils');
router.post('/', isAuth, upload.single('filename'), FileUploadController.create);
router.post('/one', FileUploadController.find);
router.get('/', isAuth, FileUploadController.findAll);
router.put('/', isAuth, FileUploadController.update);
router.delete('/', isAuth, FileUploadController.delete);

module.exports = router;
