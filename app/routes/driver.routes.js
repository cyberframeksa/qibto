const express = require('express');
const router = express.Router();
const DriverController = require('../controllers/driver');
const authGaurd = require('../auth/school_auth');

router.post('/adddriver', authGaurd, DriverController.addDriver);
router.post('/getdriver', DriverController.getDriver);
router.post('/login', DriverController.loginDriver);
router.post('/updatedriver', authGaurd, DriverController.updateDriver);
router.post('/removedriver', authGaurd, DriverController.removeDriver);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
