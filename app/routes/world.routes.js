const express = require('express');
const router = express.Router();
const WorldController = require('../controllers/world');
const authGaurd = require('../auth/auth');

router.post('/addallcountry', WorldController.addAllCountry);
router.post('/addallstate', WorldController.addAllState); 

router.post('/addcountry', authGaurd, WorldController.addCountry);
router.post('/addstate', authGaurd, WorldController.addState);
router.post('/addcity', authGaurd, WorldController.addCity);

router.post('/getallcountry', WorldController.getAllCountry);
router.post('/getcountry', WorldController.getCountry);
router.post('/getstate', WorldController.getState);
router.post('/getcity', WorldController.getCity);

router.post('/updatecountry', authGaurd, WorldController.updateCountry);
router.post('/updatestate', authGaurd, WorldController.updateState);
router.post('/updatecity', authGaurd, WorldController.updateCity);

router.post('/disablecountry', authGaurd, WorldController.disableCountry);
router.post('/disablestate', authGaurd, WorldController.disableState);
router.post('/disablecity', authGaurd, WorldController.disableCity);

router.post('/removecountry', authGaurd, WorldController.removeCountry);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
