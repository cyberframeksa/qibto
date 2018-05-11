const Booking = require('../models/booking');
const School = require('../models/school');
const SchoolsCar = require('../models/schoolscar');
const Driver = require('../models/driver');
const Car = require('../models/car');
const Package = require('../models/package');
const User = require('../models/user');
const Notification = require('../models/notification');
const config = require('../config');
var async = require('async');
const crypto = require('crypto');

module.exports = {
    addBooking: addBooking,
    customBooking: customBooking,
    getBooking: getBooking,
    getAllBooking: getAllBooking,
    getUserBooking: getUserBooking,
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
        car_brand_id: req.body.car_brand_id,
        car_type_id: req.body.car_type_id,
        ac_non_ac: req.body.ac_non_ac,
        pickup_drop: req.body.pickup_drop,
        daily_drive: req.body.daily_drive,
        course_duration: req.body.course_duration,        
        package_id: req.body.package_id,
        user_id: req.body.user_id,
        school_id: req.body.school_id,
        current_driver_id: req.body.current_driver_id,
        other_drivers: req.body.other_drivers,
        time_preferred: req.body.time_preferred,
        time_optional: req.body.time_optional,
        start_date: req.body.start_date,
        end_date: req.body.end_date
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

function getSchoolsCar(id){
    return new Promise((resolve, reject)=>{
        SchoolsCar.find({school_id: id}).then((element)=>{
            console.log(element);
            resolve(element);
        }).catch((err)=>{
            console.log(err);
            resolve({});
        });
    });
}

function customBooking(req, res, next) {
    
    var lat = parseInt(req.body.latitude);
    var lng = parseInt(req.body.longitude);
    if(parseInt(req.body.booking_type)==0)
    {
        if(lat && lng){
            let query = {
                "latitude": { $gt: (lat - 1), $lt: (lat + 1) },
                "longitude": { $gt: (lng - 1), $lt: (lng + 1) }
            };
            School.find(query).then((response) => {
            
                var length = response.length;
             
                if(length>0){
                
                    var client_lat = parseFloat(req.body.latitude);
                    var client_lng = parseFloat(req.body.longitude);
                    var count = 0;
                     var newArr = [];
                     
                    async.forEach(response, (element_one, callback)=>{
                        SchoolsCar.find({school_id: element_one._id}).populate('car_id').then((element_two)=>{
                            
                            count++;
                            
                            var server_lat = parseFloat(element_one.latitude);
                            var server_lng = parseFloat(element_one.longitude);
                        
                            let radlat1 = Math.PI * client_lat / 180;
                            let radlat2 = Math.PI * server_lat/180;
                            let theta = client_lng-server_lng;
                            let radtheta = Math.PI * theta / 180;
                            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                            dist = Math.acos(dist);
                            dist = dist * 180 / Math.PI;
                            dist = dist * 60 * 1.1515;
                            dist = dist * 1.609344;
                        
                            var data = {
                                _id: element_one._id,
                                name: element_one.name,
                                address: element_one.address,
                    			longitude: element_one.longitude,
                    			latitude: element_one.latitude,
                    			distance: Math.ceil(dist),
                                cars_list: []
                            };
                            
                            var cars_list = [];
                            element_two.forEach(element=>{
                                var data = {
                                    _id: element._id,
                                    car_id: element.car_id._id,
                                    school_id: element.school_id,
                                    car_brand_id: element.car_id.car_brand_id,
                                    car_type_id: element.car_id.car_type_id,
                                    ac_availability: element.car_id.ac_availability,
                                    car_name: element.car_id.car_name,
                                    booked_slot:element.booked_slot,
                                    available_date: '',
                                    available_time: ''
                                };
                                cars_list.push(data);
                            });
                            
                            data.cars_list = cars_list;
                            newArr.push(data);
                            
                            if(count==length){
                                for(var i=0; i<newArr.length; i++){
                                    for(var j=0; j<newArr.length; j++){
                                        if(newArr[i].distance<newArr[j].distance){
                                            var temp = newArr[i];
                                            newArr[i] = newArr[j];
                                            newArr[j] = temp;
                                        }
                                    }
                                }
                                
                                var matched = {
                                    _id:null,
                                    distance: null,
                                    car_id: null,
                                    school_id: null,
                                    car_brand_id: null,
                                    car_type_id: null,
                                    ac_availability: null,
                                    car_name: null,
                                    available_date: '',
                                    available_time: '',
                                    booked_slot: []
                                };
                                
                                var matchCount=0;
                                
                                (newArr).forEach((cars)=>{
                                  
                                    (cars.cars_list).forEach((element)=>{
                                      
                                        if((element.car_brand_id==req.body.car_brand_id) && (element.car_type_id==req.body.car_type_id) && (element.ac_availability=='Yes') && (matchCount==0)){
                                            
                                        var date_slot_available = false;
                                        var first_time_available = false; 
                                        var second_time_available = false; 
                                        var available_date = '';
                                        var available_time = '';
                                        
                                        (element.booked_slot).forEach((datetime)=>{
                                            var date = new Date(datetime.date);
                                            var month = date.getMonth()+1;
                                            if(month<10){
                                                month = `0${month}`;
                                            }
                                            var newdate = `${date.getFullYear()}-${month}-${date.getDate()}`;
                                            var date1 = new Date(newdate);
                                            var date2 = new Date(req.body.start_date);
                                          
                                            if(date1.getTime() === date2.getTime()){
                                             available_date = req.body.start_date;
                                             
                                            date_slot_available = true;
                                            
                                            var server_time = (datetime.time).split(':');
                                            var client_time_one = (req.body.time_preferred).split(':');
                                            var client_time_two = (req.body.time_optional).split(':');
                                            
                                            if((server_time[0]==client_time_one[0]) && (server_time[1]==client_time_one[1])){
                                                first_time_available = true;
                                            }
                                            else
                                            {
                                                available_time = req.body.time_preferred;
                                            }
                                            if((server_time[0]==client_time_two[0]) && (server_time[1]==client_time_two[1])){
                                                second_time_available = true;
                                            }
                                            else
                                            {
                                                available_time = req.body.time_optional;
                                            }
                                            
                                            }
                                            else{
                                            available_date = req.body.start_date;
                                            available_time = req.body.time_preferred;
                                            }
                                        });
                                       
                                        console.log(date_slot_available, first_time_available, second_time_available);
                                        console.log(available_date, available_time);
                                        
                                        if((date_slot_available==false)&&(first_time_available==false)&&(second_time_available==false))
                                        {
                                            matched._id = element._id;
                                            matched.distance = cars.distance;
                                            matched.car_id = element.car_id;
                                            matched.school_id = element.school_id;
                                            matched.car_brand_id = element.car_brand_id;
                                            matched.car_type_id = element.car_type_id;
                                            matched.ac_availability = element.ac_availability;
                                             matched.car_name = element.car_name;
                                            matchCount=1;
                                            matched.booked_slot = element.booked_slot;
                                            matched.available_date= available_date;
                                            matched.available_time= available_time;
                                        }
                                        else if((date_slot_available==true)&&(first_time_available==false))
                                        {
                                            matched._id = element._id;
                                            matched.distance = cars.distance;
                                            matched.car_id = element.car_id;
                                            matched.school_id = element.school_id;
                                            matched.car_brand_id = element.car_brand_id;
                                            matched.car_type_id = element.car_type_id;
                                            matched.ac_availability = element.ac_availability;
                                             matched.car_name = element.car_name;
                                            matchCount=1;
                                            matched.booked_slot = element.booked_slot;
                                          matched.available_date= available_date;
                                            matched.available_time= available_time;
                                        }
                                        else if((date_slot_available==true)&&(second_time_available==false))
                                        {
                                            matched._id = element._id;
                                            matched.distance = cars.distance;
                                            matched.car_id = element.car_id;
                                            matched.school_id = element.school_id;
                                            matched.car_brand_id = element.car_brand_id;
                                            matched.car_type_id = element.car_type_id;
                                            matched.ac_availability = element.ac_availability;
                                             matched.car_name = element.car_name;
                                            matchCount=1;
                                            matched.booked_slot = element.booked_slot;
                                            matched.available_date= available_date;
                                            matched.available_time= available_time;
                                        }
                                        else
                                        {
                                            console.log('No slot available !');
                                        }
                                        }
                                    });
                                });
                            
                                if(matched.school_id!=null)
                                {
                                    const order_id = crypto.randomBytes(10).toString('hex');
                                    
                                    var n = parseInt(req.body.course_duration);
                                    
                                    var today=new Date(req.body.start_date);
                                    var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+n+1);
                                    var nextDate = new Date(requiredDate);
                                   
                                    var newBooking = new Booking({
                                        
                                        order_id: (`${order_id}`).toUpperCase(),
                                        amount:  req.body.amount,
                                        order_status:  'Pending',
                                        booking_type: req.body.booking_type,
                                        
                                        user_id: req.body.user_id,
                                        package_id: req.body.package_id,
                                        
                                        school_id: matched.school_id,
                                        car_id: matched.car_id,
                                        car_brand_id: matched.car_brand_id,
                                        car_type_id: matched.car_type_id,
                                        
                                        ac_non_ac: req.body.ac_non_ac,
                                        pickup_drop: req.body.pickup_drop,
                                        daily_drive: req.body.daily_drive,
                                        course_duration: req.body.course_duration,
                                        
                                        time_preferred: matched.available_time,
                                        time_optional: req.body.time_optional,
                                        start_date: req.body.start_date,
                                        end_date: nextDate
                                        
                                    });
                                    
                                    newBooking.save(newBooking).then((success)=>{
                                        
                                        var datetime = { time: matched.available_time, date: req.body.start_date };
                                        SchoolsCar.findByIdAndUpdate(matched._id, {$push:{booked_slot:datetime}}, {new:true}).then((value)=>{
                                            
                                        }).catch((error)=>{
                                            console.log(error);
                                        });
                                        
                                        res.status(200);
                                        return res.json({
                                            success: true,
                                            message: `Booking Successful !`,
                                            data: success,
                                            matched: matched
                                        });
                                    }).catch((error)=>{
                                        res.status(400);
                                        return res.json({
                                            success: false,
                                            message: `Unable to save booking !`,
                                            error: error
                                        });
                                    });
                                }
                                else
                                {
                                    res.status(400);
                                    return res.json({
                                        success: false,
                                        message: `Your selected package is not available in your area !`,
                                        data: null
                                    });  
                                }
                            }
                        });
                    }, 
                    (err)=>{
                        console.log(err);
                        res.status(400);
                        return res.json({
                            success: false,
                            message: `Unable to find school !`,
                            error: err
                        });
                    });
                }
                else
                {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `We have not found any school in your area !`,
                        data: null
                    });  
                }
        
            }).catch((error) => {
                console.log(error);
                res.status(400);
                return res.json({
                    success: false,
                    message: `Unable to find school !`,
                    error: error
                });
            });
        }
        else
        {
            res.status(400);
            return res.json({
                success: false,
                message: `Latitude & Longitude is required !`
            });  
        }
    }
    else
    {
         if(lat && lng){
            let query = {
                "latitude": { $gt: (lat - 1), $lt: (lat + 1) },
                "longitude": { $gt: (lng - 1), $lt: (lng + 1) }
            };
            School.find(query).then((response) => {
            
                var length = response.length;
             
                if(length>0){
                
                    var client_lat = parseFloat(req.body.latitude);
                    var client_lng = parseFloat(req.body.longitude);
                    var count = 0;
                     var newArr = [];
                     
                    async.forEach(response, (element_one, callback)=>{
                        SchoolsCar.find({school_id: element_one._id}).populate('car_id').then((element_two)=>{
                            
                            count++;
                            
                            var server_lat = parseFloat(element_one.latitude);
                            var server_lng = parseFloat(element_one.longitude);
                        
                            let radlat1 = Math.PI * client_lat / 180;
                            let radlat2 = Math.PI * server_lat/180;
                            let theta = client_lng-server_lng;
                            let radtheta = Math.PI * theta / 180;
                            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                            dist = Math.acos(dist);
                            dist = dist * 180 / Math.PI;
                            dist = dist * 60 * 1.1515;
                            dist = dist * 1.609344;
                        
                            var data = {
                                _id: element_one._id,
                                name: element_one.name,
                                address: element_one.address,
                    			longitude: element_one.longitude,
                    			latitude: element_one.latitude,
                    			distance: Math.ceil(dist),
                                cars_list: []
                            };
                            
                            var cars_list = [];
                            element_two.forEach(element=>{
                                var data = {
                                    car_id: element._id,
                                    school_id: element.school_id,
                                    car_brand_id: element.car_id.car_brand_id,
                                    car_type_id: element.car_id.car_type_id,
                                };
                                cars_list.push(data);
                            })
                            
                            data.cars_list = cars_list;
                            newArr.push(data);
                            
                            if(count==length){
                                for(var i=0; i<newArr.length; i++){
                                    for(var j=0; j<newArr.length; j++){
                                        if(newArr[i].distance<newArr[j].distance){
                                            var temp = newArr[i];
                                            newArr[i] = newArr[j];
                                            newArr[j] = temp;
                                        }
                                    }
                                }
                                
                                var matched = {
                                    distance: null,
                                    car_id: null,
                                    school_id: null,
                                    car_brand_id: null,
                                    car_type_id: null
                                };
                                
                                var matchCount=0;
                                
                                (newArr).forEach((cars)=>{
                                    (cars.cars_list).forEach((element)=>{
                                        if((element.car_brand_id==req.body.car_brand_id) && (element.car_type_id==req.body.car_type_id) && (matchCount==0)){
                                        matched.distance = cars.distance;
                                        matched.car_id = element.car_id;
                                        matched.school_id = element.school_id;
                                        matched.car_brand_id = element.car_brand_id;
                                        matched.car_type_id = element.car_type_id;
                                        matchCount=1;
                                        }
                                    });
                                });
                                
                                if(matched.school_id!=null)
                                {
                                    const order_id = crypto.randomBytes(10).toString('hex');
                                    
                                    var newBooking = new Booking({
                                        
                                        order_id: (`${order_id}`).toUpperCase(),
                                        amount:  req.body.amount,
                                        order_status:  'Pending',
                                        booking_type: req.body.booking_type,
                                        
                                        user_id: req.body.user_id,
                                        package_id: req.body.package_id,
                                        
                                        school_id: matched.school_id,
                                        car_id: matched.car_id,
                                        car_brand_id: matched.car_brand_id,
                                        car_type_id: matched.car_type_id,
                                        
                                        ac_non_ac: req.body.ac_non_ac,
                                        pickup_drop: req.body.pickup_drop,
                                        daily_drive: req.body.daily_drive,
                                        course_duration: req.body.course_duration,
                                        
                                        time_preferred: req.body.time_preferred,
                                        time_optional: req.body.time_optional,
                                        start_date: req.body.start_date,
                                        end_date: req.body.end_date
                                        
                                    });
                                    
                                    newBooking.save(newBooking).then((success)=>{
                                        res.status(200);
                                        return res.json({
                                            success: true,
                                            message: `Booking Successful !`,
                                            data: success
                                        });
                                    }).catch((error)=>{
                                        res.status(400);
                                        return res.json({
                                            success: false,
                                            message: `Unable to save booking !`,
                                            error: error
                                        });
                                    });
                                }
                                else
                                {
                                    res.status(400);
                                    return res.json({
                                        success: false,
                                        message: `Your selected package is not available in your area !`,
                                        data: null
                                    });  
                                }
                            }
                        });
                    }, 
                    (err)=>{
                        console.log(err);
                        res.status(400);
                        return res.json({
                            success: false,
                            message: `Unable to find school !`,
                            error: err
                        });
                    });
                }
                else
                {
                    res.status(400);
                    return res.json({
                        success: false,
                        message: `We have not found any school in your area !`,
                        data: null
                    });  
                }
        
            }).catch((error) => {
                console.log(error);
                res.status(400);
                return res.json({
                    success: false,
                    message: `Unable to find school !`,
                    error: error
                });
            });
        }
        else
        {
            res.status(400);
            return res.json({
                success: false,
                message: `Latitude & Longitude is required !`
            });  
        }
    }
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
        Booking.findById(req.body._id).populate('car_id car_brand_id car_type_id package_id').exec(function (err, booking) {
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

function getUserBooking(req, res, next){
    let data = req.body.data || {};
    Booking.find(data).populate('car_id car_brand_id car_type_id school_id package_id').sort({ created_at : -1}).exec(function(err, booking) {
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

function getAllBooking(req, res){
    let data = req.body.data || {};
    Booking.find(data).populate('car_id car_brand_id car_type_id package_id').sort({ created_at : -1}).exec(function(err, booking) {
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
    // Booking.remove().then((response)=>{
    //     res.status(200);
    //     return res.json({
    //         success:true,
    //         message:"Booking removed successfully !",
    //     });
    // }).catch((err)=>{
    //     res.status(400);
    //     return res.json({
    //         success:false,
    //         message:"Unable to remove booking !",
    //         error:err
    //     });
    // });
    
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