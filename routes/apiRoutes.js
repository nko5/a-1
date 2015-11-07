const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const moviesController = require('../controllers/moviesController');
const placesController = require('../controllers/placesController');

router.route('/movies').get(moviesController.getTheaters);
router.route('/places').get(placesController.getPlaces);

router.use(authController.ensureAuthenticated);
router.route('/profile').get(profileController.getUserAccount);

module.exports = router;
