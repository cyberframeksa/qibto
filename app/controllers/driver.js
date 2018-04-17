const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const Driver = require('../models/driver');

module.exports = {
    addDriver: addDriver,
    getDriver: getDriver,
    loginDriver: loginDriver,
    updateDriver: updateDriver,
    removeDriver: removeDriver
};

function addDriver(req, res) {

    let driver = new Driver({
        name:               req.body.name,
        email:              req.body.email,
        password:           req.body.password,
        mobile:             req.body.mobile,
        address:            req.body.address,
        school_id:          req.body.school_id
    });
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(driver.password, salt, function (err, hash) {
            driver.password = hash;
            driver.save(driver).then((response) => {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Driver has been saved successfully !',
                    data: response
                });
            }).catch((error) => {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to save driver !',
                    error: error
                });
            });
        });
    });
}

function loginDriver(req, res){
    if(!req.body.email || !req.body.password){
        res.status(400);
        return res.json({
            success:false,
            message:"Email and password is required !"
        });
    }
    Driver.findOne({ email: req.body.email }).then((response)=>{
        if(bcrypt.compareSync(req.body.password, response.password)){
            var payload = {
                _id: response._id,
                email: response.email,
                role:'driver'
            }
            var token = jwt.sign({ data: payload }, config.school_driver_secret, { expiresIn: config.token_expire });
            res.status(200);
            return res.json({
                success:true,
                message:"Logged in successfully !",
                token: token,
                data: response
            });
        }
        else{
            res.status(400);
            return res.json({
                success:false,
                message:"Your password is incorrect, Please try again !"
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

function getDriver(req, res) {
    let data = req.body.data || {};
    Driver.find(data).populate('school_id', 'name').then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Driver fetched successfully !',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch driver !',
            error: error
        });
    });
}

function updateDriver(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to update Driver, Unique id(_id) not found !",
        });
    } else {
        Driver.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Driver has been updated successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unbale to update Driver !',
                error: error
            });
        });
    }
}

function removeDriver(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete driver, unique id(_id) not found !'
        });
    } else {
        Driver.findByIdAndRemove(req.body._id).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Driver has been deleted successfully !'
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete Driver !',
                error: error
            });
        });
    }
}
