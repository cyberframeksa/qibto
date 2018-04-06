var jwt = require('jsonwebtoken');
var Booking = require('../models/booking');
var config = require('../config');

function user_auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.token_secret, function (err, decoded) {
            if (err) {
                res.status(400);
                return res.json({ 
                    success: false, 
                    message: 'You are not authorised to make this request, Wrong credentials provided !' 
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
            message: 'You are not authorised to make this request !'
        });
    }
}

module.exports = user_auth;