const express = require('express');
const registratincontrollers = require('../../controllers/registratincontrollers');
const matchOTP = require('../../controllers/matchOtpController');
const loginController = require('../../controllers/loginCrontroller');
const router = express.Router();

router.post('/registration', registratincontrollers )
router.post('/matchOTP', matchOTP )
router.post('/login', loginController )

module.exports = router;

