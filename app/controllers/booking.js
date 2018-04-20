const Booking = require('../models/booking');
const School = require('../models/school');
const Driver = require('../models/driver');
const Car = require('../models/car');
const Package = require('../models/package');
const User = require('../models/user');
const Notification = require('../models/notification');
const config = require('../config');

module.exports = {
    addBooking: addBooking,
    getBooking: getBooking,
    getAllBooking:getAllBooking,
    updateBooking: updateBooking,
    removeBooking: removeBooking  
}

function addBooking(req, res, next) {

    var newBooking = new Booking({
        order_id: req.body.order_id,
        amount:  req.body.amount,
        order_status:  req.body.order_status,
        booking_type: req.body.booking_type,
        car_id: req.body.car_id,
        ac_non_ac: req.body.ac_non_ac,
        puckup_drop: req.body.puckup_drop,
        daily_drive: req.body.daily_drive,
        course_duration: req.body.course_duration,        
        package_id: req.body.package_id,
        user_id: req.body.user_id,
        current_driver_id: req.body.current_driver_id,
        other_drivers: req.body.other_drivers,
        training_time: req.body.training_time
    });

    newBooking.save((err, booking) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message: "Unable to add booking !",
                error:err
            });
        }
        else
        {
            var newNotification = new Notification({
                booking_id: booking._id,
                user_id:  booking.user,
                message:  `We have found an new booking with an amount of ${booking.amount}`
            });
        
            newNotification.save((err, notification) => {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Booking added successfully !',
                    data: { booking:booking, notification: notification }
                });
            });
        }
    });
}

function getBooking(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch booking, Unique id not found !'
        });
    }
    else{
        Booking.findById(req.body._id).populate('car_id package_id').exec(function (err, booking) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to fetch booking !",
                    error:err
                });
            }
            if(!booking){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to fetch booking, booking not found !",
                });
            }
            else{
                res.status(200);
                return res.json({
                    success:true,
                    message:"Booking fetched successfully !",
                    data:booking
                });
            }
        });
    }
}

function getAllBooking(req, res){
    let data = req.body.data || {};
    Booking.find(data).populate('car_id package_id').sort({ updatedAt : -1}).exec(function(err, booking) {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to find booking !",
                error:err
            });
        }
        if(!booking){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to fetch, booking not found !",
                data:null
            });
        }
        else{
            res.status(200);
            return res.json({
                success:true,
                message:"Booking fetched successfully !",
                data:booking
            });
        }
    });
}

function updateBooking(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Booking.findById(req.body._id, function (err, booking) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update booking !",
                    error:err
                });
            }
            if(!booking){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Booking not found !",
                });
            }
            else{
                Booking.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true}, (err, booking) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to update booking !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Booking updated successfully !",
                        data:booking
                    });
                });
            }
        });
    }
}

function removeBooking(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove, Unique id not found !'
        });
    }
    else{
        Booking.findById(req.body._id, function (err, booking) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove booking !",
                    error:err
                });
            }
            if(!booking){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove, Booking not found !",
                });
            }
            else{
                Booking.findByIdAndRemove(req.body._id, (err, booking) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to remove booking !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Booking removed successfully !",
                    });
                });
            }
        });
    }
}