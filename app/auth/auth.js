var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Package = require('../models/package');
var School = require('../models/school');
var Booking = require('../models/booking');
var Notification = require('../models/notification');
const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');
var config = require('../config');

function auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.super_admin_secret, function (err, decoded) {
            if (err) {
                res.status(400);
                return res.json({ 
                    success: false, 
                    message: 'You are not admin, Wrong token provided!' 
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
            message: 'If you are admin, then please provide token along with data !'
        });
    }
}

module.exports = auth;