const express = require('express');
const router = express.Router();
const PackageController = require('../controllers/package');
const authGaurd = require('../auth/auth');

router.post('/addpackage', authGaurd, PackageController.addPackage);
router.post('/getpackage', PackageController.getPackage);
router.post('/updatepackage', authGaurd, PackageController.updatePackage);
router.post('/removepackage', authGaurd, PackageController.removePackage);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
