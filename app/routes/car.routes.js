const express = require('express');
const router = express.Router();
const CarController = require('../controllers/car');

router.post('/addcar', CarController.addCar);
router.post('/getcar', CarController.getCar);
router.post('/updatecar', CarController.updateCar);
router.post('/removecar', CarController.removeCar);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
