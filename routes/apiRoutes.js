"use strict";

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');
const moviesController = require('../controllers/moviesController');

router.route('/movies').get(moviesController.getTheaters);

router.use(authController.ensureAuthenticated);
router.route('/profile').get(profileController.getUserAccount);


module.exports = router;
