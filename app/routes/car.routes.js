const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car');
const authGaurd = require('../auth/school_auth');

router.post('/addcar', authGaurd, CarController.addCar);
router.post('/getcar', CarController.getCar);
router.post('/updatecar', authGaurd, CarController.updateCar);
router.post('/removecar', authGaurd, CarController.removeCar);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
