const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/google').post(authController.getGoogleAuthToken);

module.exports = router;