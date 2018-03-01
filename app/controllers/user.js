const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const generator = require('generate-password');

const User = require('../models/user');
const Token = require('../models/token');
const config = require('../config');
const mailFunction = require('./mail');


module.exports = {
    signUpUser: signUpUser,
    signInUser: signInUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    updateProfileUser: updateProfileUser,
    changePasswordUser: changePasswordUser,
    forgotPasswordUser: forgotPasswordUser,
    resetUser: resetUser,
    resetPasswordUser: resetPasswordUser,
    removeUser: removeUser
}

function signUpUser(req, res) {
    var user  = User.where({ email: req.body.email });
    user.findOne((err, user) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Internal server error !",
                error:err
            });
        }
        if(user){
            res.status(400);
            return res.json({
                success:false,
                message:`User ${user.email} already exits !`,
                data:null
            });
        }
        else{
            var newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                dob: req.body.dob,
                gender: req.body.gender,
                mobile: req.body.mobile,
                email: req.body.email,
                address: req.body.address,
                password: req.body.password
            });
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(newUser.password, salt, function (err, hash) {
                    newUser.password = hash;
                    newUser.save((err, user) => {
                        if (err){
                            res.status(400);
                            return res.json({
                                success:false,
                                message:"Internal server error !",
                                error:err
                            });
                        }
                        var payload = {
                            _id: user._id,
                            email: user.email
                        }
                        var token = jwt.sign({ data: payload }, config.token_secret, { expiresIn: config.token_expire });
                        const email = user.email;
                        const subject = 'Registration Successfull !';
                        const html = `
                                    <br><b>Dear ${user.first_name} ${user.last_name} !</b><br><br>
                                    <p>Your account has been created successfully !</p>
                                    <p>Please login to your account and keep enjoying our services !</p><br>
                                    <p>Thanks</p>
                                    <b>QIBTO Team</b>
                                    `;
                        try{
                            (mailFunction.sendEmail(email, subject, html)).then((response)=>{ 
                                if(response)
                                {
                                    res.status(200);
                                    return res.json({
                                        success: true,
                                        message: 'User registered successfully !',
                                        token: token
                                    });
                                }
                                else
                                {
                                    res.status(400);
                                    return res.json({
                                        success: false,
                                        message: 'Unable to register user, Please try after sometime !',
                                    });
                                }
                            });
                        }
                        catch(e){
                            res.status(400);
                            return res.json({
                                success: false,
                                message: 'Unable to register user, Please try after sometime !',
                            });
                        }
                    }, (err)=>{
                        res.status(400);
                        return res.json({
                            success:false,
                            error: err
                        });
                    });
                });
            });  
        }
    });
}

function signInUser(req, res){
    
    if(!req.body.email || !req.body.password){
        res.status(400);
        return res.json({
            success:false,
            message:"Required field error !",
            data:null
        });
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err){
            res.status(400);
            return res.json({
                success:false,
                message:"Internal server error !",
                error:err
            });
        }
        if(!user){
            res.status(400);
            return res.json({
                success:false,
                message:"User not found !",
                data:null
            });
        }
        else{
            if(bcrypt.compareSync(req.body.password, user.password)){
                var payload = {
                    _id: user._id,
                    email: user.email
                }
                var token = jwt.sign({ data: payload }, config.token_secret, { expiresIn: config.token_expire });
                user.password = '';
                res.status(200);
                return res.json({
                    success:true,
                    message:"Logged in successfully !",
                    token: token
                });
            }
            else{
                res.status(400);
                return res.json({
                    success:false,
                    message:"Password doesn't match !",
                    data: null
                });
            }
        }
    });
}

function getUser(req, res){
    try{
        jwt.verify(req.body.token, config.token_secret, function(err, decoded) {
            if(err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"You are not authenticated to make this request !",
                    error: err
                });
            }else{
                User.findOne({ _id: decoded.data._id }, (err, user) => {
                    if (err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Internal server error !",
                            error:err
                        });
                    }
                    if(!user){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"User not found !",
                            data:null
                        });
                    }
                    else{
                        user.password = '';
                        res.status(200);
                        return res.json({
                            success:true,
                            message:"User fetched successfully !",
                            data: user
                        });
                    }
                });
            }
        });
    }
    catch(err){
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to verify identity, Please try again !",
            error: error
        });
    }
}

function getAllUsers(req, res){
    try{
        jwt.verify(req.body.token, config.token_secret, function(err, decoded) {
            if(err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"You are not authenticated to make this request !",
                    error: err
                });
            }else{
                User.find(req.body.data, (err, user) => {
                    if (err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Internal server error !",
                            error:err
                        });
                    }
                    if(!user){
                        res.status(200);
                        return res.json({
                            success:false,
                            message:"Users not found !",
                            data:null
                        });
                    }
                    else{
                        res.status(200);
                        return res.json({
                            success:true,
                            message:"Users fetched successfully !",
                            data: user
                        });
                    }
                });
            }
        });
    }
    catch(err){
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to verify identity, Please try again !",
            error: error
        });
    }
}

function updateProfileUser(req, res){
    try{
        jwt.verify(req.body.token, config.token_secret, function(err, decoded) {
            if(err)
            {
                res.status(400);
                return res.json({
                    success:false,
                    message:"You are not authenticated to make this request !",
                    error: err
                });
            }
            else
            {
                if(!decoded.data._id){
                    res.status(400);
                    return res.json({
                        success:false,
                        message:'Unable to update, Unique id not found !'
                    });
                }
                else{
                    User.findById(decoded.data._id, function (err, user) {
                        if(err){
                            res.status(400);
                            return res.json({
                                success:false,
                                message:"Internal server error !",
                                error:err
                            });
                        }
                        if(!user){
                            res.status(400);
                            return res.json({
                                success:false,
                                message:"Unable to update, User not found !"
                            });
                        }
                        else{
                            User.findByIdAndUpdate(decoded.data._id, {$set: req.body.data}, {new:true}, (err, user) => {
                                if(err){
                                    res.status(400);
                                    return res.json({
                                        success:false,
                                        message:"Internal server error !",
                                        error:err
                                    });
                                }
                                res.status(200);
                                return res.json({
                                    success:true,
                                    message:"User updated successfully !",
                                    data:user
                                });
                            });
                        }
                    });
                }
            }
        });
    }
    catch(err){
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to verify identity, Please try again !",
            error: error
        });
    }
}

function changePasswordUser(req, res){
    try{
        jwt.verify(req.body.token, config.token_secret, function(err, decoded) {
            if(err)
            {
                res.status(400);
                return res.json({
                    success:false,
                    message:"You are not authenticated to make this request !",
                    error: err
                });
            }
            else
            {
                if(!decoded.data._id){
                    res.status(400);
                    return res.json({
                        success:false,
                        message:'Unable to update, Unique id not found !',
                        data:decoded
                    });
                }
                else{
                    User.findById(decoded.data._id, (err, user) => {
                        if(err){
                            res.status(400);
                            return res.json({
                                success:false,
                                message:"Internal server error !",
                                error:err
                            });
                        }
                        if (!user) {
                            res.status(400);
                            return res.json({
                                success: false,
                                message: 'User not found !'
                            });
                        } else {
                            bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(req.body.data.password, salt, function (err, hash) {
                                    req.body.data.password= hash;
                                    User.findByIdAndUpdate(decoded.data._id, {$set: req.body.data}, (err, user) => {
                                        if (err){
                                            res.status(400);
                                            return res.json({
                                                success:false,
                                                message:"Internal server error !",
                                                error:err
                                            });
                                        }
                                        res.status(200);
                                        return res.json({
                                            success: true,
                                            message: 'Password updated successfully !',
                                            data: user
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
            }
        });
    }
    catch(err){
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to verify identity, Please try again !",
            error: error
        });
    }
}

function forgotPasswordUser(req, res){
    if (!req.body.email) {
        res.status(400);
        return res.json({
            success: false,
            message: 'Email address is required !'
        });
    } else {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Email address is not found in our database !'
                });
            } 
            else 
            {
                const token = uuidv4();
                const email = req.body.email;
                const subject = 'Reset Password !';
                const html = `
                             <br><b>Dear ${email} !</b><br><br>
                             <p>You have requested to reset your password. Please click on below link to reset your password.</p><br>
                             <a href="${config.SERVER_URL}/users/reset/${token}">Click me to reset your password !</a><br><br>
                             <p>Thanks</p>
                             <b>QIBTO Team</b>
                             `;
                try{
                    (mailFunction.sendEmail(email, subject, html)).then((response)=>{ 
                        if(response)
                        {
                            var newToken = new Token({
                                token: token,
                                userId: user._id,
                                email: email
                            });
                            newToken.save();
                            res.status(200);
                            return res.json({
                                success: true,
                                message: 'A password reset link has been sent to your email !'
                            });
                        }
                        else
                        {
                            res.status(400);
                            return res.json({
                                success: false,
                                message: 'Unable to send email, Please try after sometime !',
                            });
                        }
                    });
                }
                catch(e){
                    res.status(400);
                    return res.json({
                        success: false,
                        message: 'Unable to send email, Please try after sometime !',
                    });
                }
            }
        })
    }
}

function resetUser(req, res, next) {
    if(!req.params.token){
        res.status(400);
        return res.json({
            error: true,
            message: 'Reset token not found !'
        });
    } 
    else{
        Token.findOne({ token: req.params.token }, function (err, tokenInfo) {
            if (err){
                res.status(400);
                return res.json({
                    error: true,
                    message: 'Reset token not found !'
                });
            } 
            if (!tokenInfo){
                res.status(400);
                return res.json({
                    error: true,
                    message: 'Reset token not found !'
                });
            } 
            else{
                var currentTime = new Date();
                var tokenExpireTime = new Date(tokenInfo.createdAt);
                tokenExpireTime.setDate(tokenExpireTime.getDate() + 1);
                if(currentTime.getTime() > tokenExpireTime.getTime()){
                    Token.remove({ token: tokenInfo.token });
                    res.status(400);
                    return res.json({
                        error: true,
                        message: 'Password reset link has been expired !'
                    });
                } 
                else 
                {
                    User.findById(tokenInfo.userId, function (err, user){
                        if (err) throw err;
                        res.render('reset-password', {
                            token: tokenInfo.token,
                            error: '',
                            redirectUrl: config.SERVER_URL + '/users/reset-password/' + tokenInfo.token
                        });
                    });
                }
            }
        });
    }
}

function resetPasswordUser(req, res, next) {
    var password = req.body.password;
    if(!req.body.password){
        res.render('reset-password', {
            token: req.params.token,
            error: 'Please enter your password !',
            redirectUrl: config.SERVER_URL + 'users/reset-password/' + req.params.token
        });
    }
    else if(req.body.password.length < 6){
        res.render('reset-password', {
            token: req.params.token,
            error: 'Password must be at least 6 characters long !',
            redirectUrl: config.SERVER_URL + 'users/reset-password/' + req.params.token
        });
    }
    else{
        Token.findOne({ token: req.params.token }, function (err, tokenInfo) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    User.findByIdAndUpdate(tokenInfo.userId, { password: hash }, function (err, success) {
                        if (err) throw err;
                        Token.remove({ userId: tokenInfo.userId }, function (err, success) {
                            if (err) throw err;
                        });
                        const email = tokenInfo.email;
                        const subject = 'Password Changed Successfully !';
                        const html = `
                                    <br><b>Dear ${email} !</b><br><br>
                                    <p>Your password has been changed successfully !</p><br>
                                    <p>Thanks</p>
                                    <b>QIBTO Team</b>
                                    `;
                        try{
                            (mailFunction.sendEmail(email, subject, html)).then((response)=>{ 
                                if(response)
                                {
                                    res.render('response');
                                }
                                else
                                {
                                    res.status(400);
                                    return res.json({
                                        success: false,
                                        message: 'Unable to change password, Please try after sometime !',
                                    });
                                }
                            });
                        }
                        catch(e){
                            res.status(400);
                            return res.json({
                                success: false,
                                message: 'Unable to change password, Please try after sometime !',
                            });
                        }
                    });
                });
            });
        });
    }
}

function removeUser(req, res){
    try{
        jwt.verify(req.body.token, config.token_secret, function(err, decoded) {
            if(err)
            {
                res.status(400);
                return res.json({
                    success:false,
                    message:"You are not authenticated to make this request !",
                    error: err
                });
            }
            else
            {
                if(!req.body.data._id){
                    res.status(400);
                    return res.json({
                        success:false,
                        message:'Unable to remove, Unique id not found !'
                    });
                }
                else{
                    User.findById(req.body.data._id, function (err, user) {
                        if (err) throw err;
                        if(!user){
                            res.status(400);
                            return res.json({
                                success:false,
                                message:"Unable to delete, Car not found !",
                            });
                        }
                        else{
                            User.findByIdAndRemove(req.body.data._id, (err, user) => {
                                if(err) throw err;
                                res.status(200);
                                return res.json({
                                    success:true,
                                    message:"User deleted successfully !",
                                });
                            });
                        }
                    });
                }
            }
        });
    }
    catch(err){
        res.status(400);
        return res.json({
            success:false,
            message:"Unable to verify identity, Please try again !",
            error: error
        });
    }
}