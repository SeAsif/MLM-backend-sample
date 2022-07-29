const { validate } = require('express-validation');
const CartController = require('../controllers/CartController');
const { addToCart, updateShipping } = require('../validations/validateCart');
const router = require('express').Router();

router.post('/add', validate(addToCart, {}, {}), CartController.add);
router.put('/:hash', validate(updateShipping, {}, {}), CartController.update);
router.get('/:hash', CartController.find);
router.delete('/:hash', CartController.clear);
router.delete('/product/:hash/:productId', CartController.removeItem);

module.exports = router;
