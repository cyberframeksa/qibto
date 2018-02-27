const Package = require('../models/package');
const config = require('../config');

module.exports = {
    addPackage: addPackage,
    getPackage: getPackage,
    updatePackage: updatePackage,
    removePackage: removePackage  
}

function addPackage(req, res) {

    var newPackage = new Package({
        car_id:     req.body.car_id,
        plan_name:  req.body.plan_name,
        pick_drop:  req.body.pick_drop,
        drive_daily: req.body.drive_daily,
        plan_price: req.body.plan_price,
        course_duration: req.body.course_duration
    });

    newPackage.save(function (err, package) {
        if (err) throw err;
        res.status(200);
        return res.json({
            success: true,
            message: 'Package added successfully !',
            data: package
        });
    }, (err)=>{
        res.status(400);
        return res.json({
            success:false,
            error: err
        });
    });
}

function getPackage(req, res){
    Package.find(req.body, function (err, package) {
        if (err) throw err;
        if(!package){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to fetch, Package not found !",
                data:null
            });
        }
        else{
            res.status(200);
            return res.json({
                success:true,
                message:"Package fetched successfully !",
                data:package
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
        Package.findById(req.body._id, function (err, package) {
            if (err) throw err;
            if(!package){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Package not found !",
                });
            }
            else{
                Package.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true},(err, package) => {
                    if(err) throw err;
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Package updated successfully !",
                        data:package
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
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Package.findById(req.body._id, function (err, package) {
            if (err) throw err;
            if(!package){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to delete, Package not found !",
                });
            }
            else{
                Package.findByIdAndRemove(req.body._id, (err, package) => {
                    if(err) throw err;
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Package deleted successfully !",
                    });
                });
            }
        });
    }
}