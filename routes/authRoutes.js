const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/google').post(authController.authenticateGoogle);

module.exports = router;