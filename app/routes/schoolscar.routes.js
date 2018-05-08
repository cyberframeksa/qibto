const express = require('express');
const router = express.Router();
const SchoolsCarController = require('../controllers/schoolscar');
const commonAuthGaurd = require('../auth/common_auth');
const userAuthGaurd = require('../auth/user_auth');

router.post('/addschoolscar/', commonAuthGaurd, SchoolsCarController.AddSchoolsCar);
router.post('/getschoolscar/', commonAuthGaurd, SchoolsCarController.GetSchoolsCar);
router.post('/getuserschoolscar/', userAuthGaurd, SchoolsCarController.GetUserSchoolsCar);
router.post('/updateschoolscar/', commonAuthGaurd, SchoolsCarController.UpdateSchoolsCar);
router.post('/removeschoolscar/', commonAuthGaurd, SchoolsCarController.RemoveSchoolsCar);

router.get('/', function(req, res, next){
    res.send(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;