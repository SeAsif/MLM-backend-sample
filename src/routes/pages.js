const PagesController = require('../controllers/PagesController');
const { upload } = require('../utils/imageUpload');
const router = require('express').Router();

// Create page
router.post(
  '/',
  upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  PagesController.create
);

// Find Page by slug
router.get('/:slug', PagesController.find);

// Update Page
router.put('/', PagesController.update);

// Delete Page
router.delete('/', PagesController.delete);

module.exports = router;
