const { validate } = require('express-validation');
const OrderController = require('../controllers/OrderController');
const router = require('express').Router();

router.post('/add/:hash', OrderController.add);
router.get('/:hash', OrderController.myOrders);
router.get('/single/:id', OrderController.single);

module.exports = router;
