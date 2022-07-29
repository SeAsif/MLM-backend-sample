const router = require('express').Router();
const SiteSettingsController = require('../controllers/SiteSettingsController');
const { upload } = require('../utils/imageUpload');

router.get('/', SiteSettingsController.find);
router.get('/:key', SiteSettingsController.find);
router.post('/:key', SiteSettingsController.create);
router.put('/:key', upload.single('logo'), SiteSettingsController.update);
router.delete('/:key', SiteSettingsController.delete);

module.exports = router;
