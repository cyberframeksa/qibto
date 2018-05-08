const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const School = require('../models/school');
const SchoolsCar = require('../models/schoolscar');
const Driver = require('../models/driver');

module.exports = {
    addSchool: addSchool,
    loginSchool:loginSchool,
    getSchool: getSchool,
    filterSchool: filterSchool,
    getSingleSchool:getSingleSchool,
    updateSchool: updateSchool,
    removeSchool: removeSchool
};

function addSchool(req, res) {
    var logo_path = null;
    var license_image_path = null;

    if(req.files!=undefined){
        logo_path = `http://node.cyberframe.in/images/${req.files.logo[0].filename}`;
    }
    else{
        logo_path = 'http://node.cyberframe.in/images/user.png';
    }
    if(req.files!=undefined){
        license_image_path = `http://node.cyberframe.in/images/${req.files.license_image[0].filename}`;
    }
    else{
        license_image_path = 'http://node.cyberframe.in/images/license.png';
    }
    
    let school = new School({
        owner:             req.body.owner,
        name:              req.body.name,
        email:             req.body.email,
        password:          req.body.password,
        mobile:            req.body.mobile,
        latitude:          req.body.latitude,
        longitude:         req.body.longitude,
        address:           req.body.address,
        city:              req.body.city,
        state:             req.body.state,
        country:           req.body.country,
        registration_no:   req.body.registration_no,
        license_no:        req.body.license_no,
        logo:              logo_path,
        license_image:     license_image_path,
        alt_mobile:        req.body.alt_mobile
    });
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(school.password, salt, function (err, hash) {
            school.password = hash;
            school.save(school).then((response) => {
                response.password = '';
                res.status(200);
                return res.json({
                    success: true,
                    message: 'School has been saved successfully !',
                    data: response
                });
            }).catch((error) => {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to save School !',
                    error: error
                });
            });
        });
    });
}

function loginSchool(req, res){
    if(!req.body.email || !req.body.password){
        res.status(400);
        return res.json({
            success:false,
            message:"Email and password is required !"
        });
    }
    School.findOne({ email: req.body.email }).then((response)=>{
        var match = bcrypt.compareSync(req.body.password, response.password);
        var verified = response.status;
        if(!match){
            res.status(400);
            return res.json({
                success:false,
                message:"Your password is incorrect, Please try again !"
            });
        }
        if(!verified){
            res.status(400);
            return res.json({
                success:false,
                message:"Your account is not verified, Please contact admin for verification !"
            });
        }
        else{
            var payload = {
                _id: response._id,
                email: response.email,
                role:'school'
            }
            var token = jwt.sign({ data: payload }, config.school_admin_secret, { expiresIn: config.token_expire });
            response.password = '';
            res.status(200);
            return res.json({
                success:true,
                message:"Logged in successfully !",
                token: token,
                data: response
            });
        }
    }).catch((error)=>{
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to login, Please try again !",
            error: error
        });
    });
}

function getSchool(req, res) {
    let data = req.body.data || {};
    if(data._id){
        School.findById(data._id).then((response) => {
            Driver.find({school_id: response._id}).then((drivers)=>{
                res.status(200);
                return res.json({
                    success: true,
                    message: 'School fetched successfully !',
                    data: { school_data:response, driver_list: drivers }
                });
            }).catch((error)=>{
                res.status(400);
                return res.json({
                    success:false,
                    message:'Unable to fetch school !',
                    error:error
                });
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch School !',
                error: error
            });
        });
    }
    else
    {
        School.find(data).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School fetched successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch School !',
                error: error
            });
        });
    }
}

function getSingleSchool(req, res){
    School.findById(req.body._id).then((response) => {
        Driver.find({school_id: response._id}).then((drivers)=>{
            res.status(200);
            return res.json({
                success: true,
                message: 'School fetched successfully !',
                data: { school_data:response, driver_list: drivers }
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to fetch state !',
                error:error
            });
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch School !',
            error: error
        });
    });
}

function filterSchool(req, res) {
    
    var lat = parseInt(req.body.latitude);
    var lng = parseInt(req.body.longitude);
    var distance = parseInt(req.body.distance);
    if(lat && lng && distance){
        let query = {
            "latitude": { $gt: (lat - 1), $lt: (lat + 1) },
            "longitude": { $gt: (lng - 1), $lt: (lng + 1) }
        };
        School.find(query).then((response) => {
            
            var length = response.length;
            if(length>0){
                var newArr = [];
                var client_lat = parseFloat(req.body.latitude);
                var client_lng = parseFloat(req.body.longitude);
                var count = 1;
            
                for (var i = 0; i < length; i++){
                    
                    var server_lat = parseFloat(response[i].latitude);
                    var server_lng = parseFloat(response[i].longitude);
        
                    let radlat1 = Math.PI * client_lat / 180;
                    let radlat2 = Math.PI * server_lat/180;
                    let theta = client_lng-server_lng;
                    let radtheta = Math.PI * theta / 180;
                    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    dist = Math.acos(dist);
                    dist = dist * 180 / Math.PI;
                    dist = dist * 60 * 1.1515;
                    dist = dist * 1.609344;
                    
                    if (Math.ceil(dist) <= distance) {
                        newArr.push(response[i]);
                    }
        
                    if(length==count) {
                        res.status(200);
                        return res.json({
                            success: true,
                            message: `We have found ${newArr.length} schools in your area !`,
                            total: newArr.length,
                            data: newArr,
                        });
                    }
                    count++;
                }
            }
            else
            {
                res.status(200);
                return res.json({
                    success: true,
                    message: `We have not found any school within ${distance} KM !`,
                    data: 0
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
            message: `Latitude, Longitude & Distance is required !`
        });  
    }
}


function updateSchool(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to update school, Unique id(_id) not found !",
        });
    } else {
        School.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School has been updated successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unbale to update school !',
                error: error
            });
        });
    }
}

function removeSchool(req, res) {
    // School.remove().then((response) => {
    //     res.status(200);
    //     return res.json({
    //         success: true,
    //         message: 'School has been removed successfully !'
    //     });
    // }).catch((err) => {
    //     res.status(400);
    //     return res.json({
    //         success: false,
    //         message: 'Unable to remove school !',
    //     });
    // });
    
    if(req.body._id == null){
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to remove school, unique id(_id) not found !'
        });
    } else {
        School.findByIdAndRemove(req.body._id).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School has been removed successfully !'
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to remove school !',
                error: error
            });
        });
    }
}
