const HomepageController = require('../controllers/HomepageController');

const router = require('express').Router();

router.get('/', HomepageController.allSections);

module.exports = router;
