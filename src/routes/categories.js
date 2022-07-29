const router = require('express').Router();
const CategoryController = require('../controllers/CategoriesController');
const { upload } = require('../utils/imageUpload');

router.post('/',  CategoryController.create);
router.get('/:slug', CategoryController.find);
router.get('/', CategoryController.findAll);
router.put('/', CategoryController.update);
router.delete('/', CategoryController.delete);

module.exports = router;
