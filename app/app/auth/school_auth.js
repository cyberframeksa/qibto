var jwt = require('jsonwebtoken');
var Car = require('../models/car');
var Driver = require('../models/driver');
var config = require('../config');

function school_auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.school_admin_secret, function (err, decoded) {
            if (err) {
                res.status(400);
                return res.json({ 
                    success: false, 
                    message: 'You are not school admin, Wrong token provided!' 
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } 
    else {
        res.status(400);
        return res.json({
            success: false,
            message: 'If you are school admin, then please provide token along with data !'
        });
    }
}

module.exports = school_auth;