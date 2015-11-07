const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

router.use(authController.ensureAuthenticated);
router.route('/profile').get(profileController.getUserAccount);

module.exports = router;