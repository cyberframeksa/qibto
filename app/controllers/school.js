const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const School = require('../models/school');
const Driver = require('../models/driver');

module.exports = {
    addSchool: addSchool,
    loginSchool:loginSchool,
    getSchool: getSchool,
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
        var verified = response.isVerified;
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
