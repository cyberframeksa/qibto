const express = require('express');
const router = express.Router();
const WorldController = require('../controllers/world');

router.post('/addallcountry', WorldController.addAllCountry);
router.get('/getallcountry', WorldController.getAllCountry);

router.post('/addcountry', WorldController.addCountry);
router.post('/addstate', WorldController.addState);
router.post('/addcity', WorldController.addCity);

router.post('/getcountry', WorldController.getCountry);
router.post('/getstate', WorldController.getState);
router.post('/getcity', WorldController.getCity);

router.post('/updatecountry', WorldController.updateCountry);
router.post('/updatestate', WorldController.updateState);
router.post('/updatecity', WorldController.updateCity);

router.post('/disablecountry', WorldController.disableCountry);
router.post('/disablestate', WorldController.disableState);
router.post('/disablecity', WorldController.disableCity);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
