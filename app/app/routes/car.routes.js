const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car');
const commonAuthGaurd = require('../auth/common_auth');

router.post('/addcar', commonAuthGaurd, CarController.addCar);
router.post('/getcar', commonAuthGaurd, CarController.getCar);
router.post('/updatecar', commonAuthGaurd, CarController.updateCar);
router.post('/removecar', commonAuthGaurd, CarController.removeCar);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
