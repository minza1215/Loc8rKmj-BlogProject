const express = require('express');
const router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

//const ctrlMain = require('../controllers/main');


/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* GET home page. */
router.get('/about', ctrlOthers.about);

module.exports = router;
