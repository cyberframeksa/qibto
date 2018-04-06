const Booking = require('../models/booking');
const School = require('../models/school');
const Driver = require('../models/driver');
const Car = require('../models/car');
const Package = require('../models/package');
const User = require('../models/user');

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
        status:  req.body.status,
        car: req.body.car,
        package: req.body.package,
        user: req.body.user
    });

    newBooking.save((err, booking) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to add booking !",
                error:err
            });
        }
        res.status(200);
        return res.json({
            success: true,
            message: 'Booking added successfully !',
            data: booking
        });
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
        Booking.findById(req.body._id).populate('car package').exec(function (err, booking) {
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
                    message:"Unable to fetch booking !",
                    data:booking
                });
            }
        });
    }
}

function getAllBooking(req, res){
    let data = req.body.data || {};
    Booking.find(data).populate('car package').exec(function(err, booking) {
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