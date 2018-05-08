const express = require('express');
const router = express.Router();
const CarTypeController = require('../controllers/car_type');
const commonAuthGaurd = require('../auth/common_auth');

router.post('/addcartype/', commonAuthGaurd, CarTypeController.AddCarType);
router.post('/getcartype/', CarTypeController.GetCarType);
router.post('/updatecartype/', commonAuthGaurd, CarTypeController.UpdateCarType);
router.post('/removecartype/', commonAuthGaurd, CarTypeController.RemoveCarType);

router.get('/', function(req, res, next){
    res.send(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;