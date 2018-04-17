const express = require('express');
const router = express.Router();
const CarBrandController = require('../controllers/car_brand');
const commonAuthGaurd = require('../auth/common_auth');

router.post('/addcarbrand/', commonAuthGaurd, CarBrandController.AddCarBrand);
router.post('/getcarbrand/', commonAuthGaurd, CarBrandController.GetCarBrand);
router.post('/updatecarbrand/', commonAuthGaurd, CarBrandController.UpdateCarBrand);
router.post('/removecarbrand/', commonAuthGaurd, CarBrandController.RemoveCarBrand);

router.get('/', function(req, res, next){
    res.send(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;