const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const moviesController = require('../controllers/moviesController');
const placesController = require('../controllers/placesController');
const locationController = require('../controllers/locationController');
const planController = require('../controllers/planController');

router.route('/movies').get(moviesController.getTheaters);
router.route('/places').get(placesController.getPlaces);
router.route('/location').get(locationController.getLocationDetails);
router.route('/travel-time').get(locationController.getTravelTimeReqHandler);
router.route('/plan/:agendaId').get(planController.planDay);

router.use(authController.ensureAuthenticated);
router.route('/profile').get(profileController.getUserAccount);

module.exports = router;
