const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/driver');
const commonAuthGaurd = require('../auth/common_auth');

router.post('/adddriver', commonAuthGaurd, DriverController.addDriver);
router.post('/getdriver', commonAuthGaurd, DriverController.getDriver);
router.post('/login', DriverController.loginDriver);
router.post('/updatedriver', commonAuthGaurd, DriverController.updateDriver);
router.post('/removedriver', commonAuthGaurd, DriverController.removeDriver);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
