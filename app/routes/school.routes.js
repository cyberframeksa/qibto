const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/school');
const authGaurd = require('../auth/auth');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './images');
    },
    filename: function(req, file, callback){
        callback(null, Date.now() + '.jpg');
    }
});
const upload = multer({storage: storage});

router.post('/addschool', upload.fields([{name: 'logo', maxCount: 1}, {name: 'license_image', maxCount: 1}]), SchoolController.addSchool);
router.post('/admin/login', SchoolController.loginSchool);
router.post('/getschool', authGaurd, SchoolController.getSchool);
router.post('/getsingleschool', authGaurd, SchoolController.getSingleSchool);
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
