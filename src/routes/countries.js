const CountriesController = require('../controllers/CountriesController');

const router = require('express').Router();

// create country entry
router.post('/', CountriesController.create);

// find all
router.get('/', CountriesController.findAll);

// find one
router.get('/:country_code', CountriesController.findOne);

// update one
router.put('/', CountriesController.update);

// delete one
router.delete('/', CountriesController.delete);

module.exports = router;
