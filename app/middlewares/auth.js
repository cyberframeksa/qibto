var jwt = require('jsonwebtoken');
var Car = require('../models/car');
var config = require('../config');

function auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.admin_token_secret, function (err, decoded) {
            if (err) {
                res.status(400);
                return res.json({ 
                    success: false, 
                    message: 'You are not admin, Don\'t waste your time with wrong token !' 
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
            message: 'If you are admin, then please provide token along with query !'
        });
    }
}

module.exports = auth;