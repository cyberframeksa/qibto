const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin');

router.post('/register', AdminController.registerAdmin);
router.post('/login', AdminController.loginAdmin);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !'
    });
});

module.exports = router;
