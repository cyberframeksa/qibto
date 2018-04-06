const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/booking');
const authGaurdForUser = require('../auth/user_auth');
const authGaurdForAdmin = require('../auth/auth');

router.post('/addbooking', authGaurdForUser, BookingController.addBooking);
router.post('/getbooking', authGaurdForUser, BookingController.getBooking);
router.post('/getallbooking', authGaurdForAdmin, BookingController.getAllBooking);
router.post('/updatebooking', authGaurdForAdmin, BookingController.updateBooking);
router.post('/removebooking', authGaurdForAdmin, BookingController.removeBooking);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
});

module.exports = router;
