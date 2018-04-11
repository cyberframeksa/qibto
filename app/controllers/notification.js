const Notification = require('../models/notification');
const config = require('../config');

module.exports = {
    addNotification: addNotification,
    getNotification: getNotification,
    updateNotification: updateNotification,
    removeNotification: removeNotification  
}

function addNotification(req, res, next) {
    var newNotification = new Notification({
        booking_id: req.body.booking_id,
        user_id:  req.body.user_id,
        message:  req.body.message
    });

    newNotification.save((err, notification) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to add notification !",
                error:err
            });
        }
        res.status(200);
        return res.json({
            success: true,
            message: 'Notification added successfully !',
            data: notification
        });
    });
}

function getNotification(req, res){
    var data = req.body.data || {};
    Notification.find(data).sort({ updatedAt : -1}).exec(function (err, notification) {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to find notification !",
                error:err
            });
        }
        if(!notification){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to fetch, Notification not found !",
                data:null
            });
        }
        else{
            res.status(200);
            return res.json({
                success:true,
                message:"Notification fetched successfully !",
                data:notification
            });
        }
    });

}

function updateNotification(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Notification.findById(req.body._id, function (err, notification) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update notification !",
                    error:err
                });
            }
            if(!notification){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Notification not found !",
                });
            }
            else{
                Notification.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true}, (err, notification) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to update notification !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Notification updated successfully !",
                        data:notification
                    });
                });
            }
        });
    }
}

function removeNotification(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove, Unique id not found !'
        });
    }
    else{
        Notification.findById(req.body._id, function (err, notification) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove notification !",
                    error:err
                });
            }
            if(!notification){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove, Notification not found !",
                });
            }
            else{
                Notification.findByIdAndRemove(req.body._id, (err, notification) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to remove notification !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Notification removed successfully !",
                    });
                });
            }
        });
    }
}