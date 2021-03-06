const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const Admin = require('../models/admin');

module.exports = {
    registerAdmin: registerAdmin,
    loginAdmin: loginAdmin
}

function registerAdmin(req, res) {

    let admin = new Admin({
        name:               req.body.name,
        email:              req.body.email,
        password:           req.body.password
    });
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(admin.password, salt, function (err, hash) {
            admin.password = hash;
            admin.save(admin).then((response) => {
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Admin added successfully !',
                    data: response
                });
            }).catch((error) => {
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to add admin !',
                    error: error
                });
            });
        });
    });
}

function loginAdmin(req, res){
    if(!req.body.email || !req.body.password){
        res.status(400);
        return res.json({
            success:false,
            message:"Email and password is required !"
        });
    }
    Admin.findOne({ email: req.body.email }).then((response)=>{
        if(bcrypt.compareSync(req.body.password, response.password)){
            var payload = {
                _id: response._id,
                email: response.email,
                role:'admin'
            }
            var token = jwt.sign({ data: payload }, config.super_admin_secret, { expiresIn: config.token_expire });
            res.status(200);
            return res.json({
                success:true,
                message:"Logged in successfully !",
                token: token,
                data: {
                    name: response.name,
                    email: response.email
                }
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
