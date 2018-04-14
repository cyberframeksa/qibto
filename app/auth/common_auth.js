var jwt = require('jsonwebtoken');
var config = require('../config');
var jwtDecode = require('jwt-decode');

function common_auth(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var decoded = jwtDecode(token);
    
    if(token){
        if(decoded.data.role=='admin'){
            jwt.verify(token, config.super_admin_secret, function (err, decoded) {
                if(err){
                    res.status(400);
                    return res.json({ 
                        success: false, 
                        message: 'Wrong token provided !'
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else if(decoded.data.role=='school'){
            jwt.verify(token, config.school_admin_secret, function (err, decoded) {
                if(err){
                    res.status(400);
                    return res.json({ 
                        success: false, 
                        message: 'Wrong token provided !'
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            res.status(400);
            return res.json({ 
                success: false, 
                message: 'Wrong token provided !'
            }); 
        }
    } 
    else{
        res.status(400);
        return res.json({
            success: false,
            message: 'Please provide token along with data !'
        });
    }
}

module.exports = common_auth;