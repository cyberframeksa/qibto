const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/school');
const authGaurd = require('../auth/auth');

router.post('/addschool', authGaurd, SchoolController.addSchool);
router.post('/getschool', SchoolController.getSchool);
router.post('/getsingleschool', SchoolController.getSingleSchool);
router.post('/updateschool', authGaurd, SchoolController.updateSchool);
router.post('/removeschool', authGaurd, SchoolController.removeSchool);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
