const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification');
const authGuardForAdmin = require('../auth/auth');
const authGuardForUser = require('../auth/user_auth');

router.post('/addnotification', authGuardForUser, NotificationController.addNotification);
router.post('/getnotification', authGuardForAdmin, NotificationController.getNotification);
router.post('/updatenotification', authGuardForAdmin, NotificationController.updateNotification);
router.post('/removenotification', authGuardForAdmin, NotificationController.removeNotification);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Welcome to coolest api on the earth !'
    });
});

module.exports = router;
