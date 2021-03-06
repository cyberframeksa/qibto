const Package = require('../models/package');
const Car = require('../models/car');
const config = require('../config');

module.exports = {
    addPackage: addPackage,
    getPackage: getPackage,
    updatePackage: updatePackage,
    removePackage: removePackage  
}

function addPackage(req, res, next) {

    var newPackage = new Package({
        car_id:     req.body.car_id,
        plan_name:  req.body.plan_name,
        pick_drop:  req.body.pick_drop,
        ac_non_ac: req.body.ac_non_ac,
        drive_daily: req.body.drive_daily,
        plan_price: req.body.plan_price,
        course_duration: req.body.course_duration
    });

    newPackage.save((err, pack) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to add package !",
                error:err
            });
        }
        res.status(200);
        return res.json({
            success: true,
            message: 'Package added successfully !',
            data: pack
        });
    });
}

function getPackage(req, res){
    var data = req.body.data || {};
    Package.find(data).populate({path : 'car_id', populate : {path : 'car_brand_id', select: 'brand_name'}}).populate({path : 'car_id',populate : {path : 'car_type_id', select: 'car_type'}}).exec(function (err, pack) {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to find package !",
                error:err
            });
        }
        if(!pack){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to fetch, Package not found !"
            });
        }
        else{
            res.status(200);
            return res.json({
                success:true,
                message:"Package fetched successfully !",
                data:pack
            });
        }
    });
}

function updatePackage(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Package.findById(req.body._id, function (err, pack) {
            if(err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update package !",
                    error:err
                });
            }
            if(!pack){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Package not found !"
                });
            }
            else{
                Package.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true},(err, pack) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to update package !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Package updated successfully !",
                        data:pack
                    });
                });
            }
        });
    }
}

function removePackage(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove, Unique id not found !'
        });
    }
    else{
        Package.findById(req.body._id, function (err, pack) {
            if(err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove package !",
                    error:err
                });
            }
            if(!pack){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove, Package not found !"
                });
            }
            else{
                Package.findByIdAndRemove(req.body._id, (err, pack) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to remove package !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Package removed successfully !"
                    });
                });
            }
        });
    }
}