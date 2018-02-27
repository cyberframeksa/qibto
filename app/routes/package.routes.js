const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/package');

router.post('/addpackage', PackageController.addPackage);
router.post('/getpackage', PackageController.getPackage);
router.post('/updatepackage', PackageController.updatePackage);
router.post('/removepackage', PackageController.removePackage);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
