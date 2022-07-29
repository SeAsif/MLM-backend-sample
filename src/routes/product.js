const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const { upload } = require('../utils/imageUpload');

router.post('/add', 
    upload.fields([
        { name: 'images', maxCount: 10 },
    ]), 
    ProductController.add
);
router.put('/update/:id', ProductController.update);
router.get('/category/:slug', ProductController.getProductsByCategory);

router.get('/:slug', ProductController.single);
router.delete('/:slug', ProductController.delete);

module.exports = router;
