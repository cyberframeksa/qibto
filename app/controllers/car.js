const Car = require('../models/car');
const config = require('../config');

module.exports = {
    addCar: addCar,
    getCar: getCar,
    updateCar: updateCar,
    removeCar: removeCar  
}

function addCar(req, res, next) {
    var newCar = new Car({
        car_brand: req.body.car_brand,
        car_name:  req.body.car_name,
        car_type:  req.body.car_type        
    });

    newCar.save((err, car) => {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to add car !",
                error:err
            });
        }
        res.status(200);
        return res.json({
            success: true,
            message: 'Car added successfully !',
            data: car
        });
    });
}

function getCar(req, res){

    Car.find(req.body, function (err, car) {
        if(err){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to find car !",
                error:err
            });
        }
        if(!car){
            res.status(400);
            return res.json({
                success:false,
                message:"Unable to fetch, Car not found !",
                data:null
            });
        }
        else{
            res.status(200);
            return res.json({
                success:true,
                message:"Car fetched successfully !",
                data:car
            });
        }
    });

}

function updateCar(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Car.findById(req.body._id, function (err, car) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update car !",
                    error:err
                });
            }
            if(!car){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Car not found !",
                });
            }
            else{
                Car.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true}, (err, car) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to update car !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Car updated successfully !",
                        data:car
                    });
                });
            }
        });
    }
}

function removeCar(req, res, next){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove, Unique id not found !'
        });
    }
    else{
        Car.findById(req.body._id, function (err, car) {
            if (err){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove car !",
                    error:err
                });
            }
            if(!car){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to remove, Car not found !",
                });
            }
            else{
                Car.findByIdAndRemove(req.body._id, (err, car) => {
                    if(err){
                        res.status(400);
                        return res.json({
                            success:false,
                            message:"Unable to remove car !",
                            error:err
                        });
                    }
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Car removed successfully !",
                    });
                });
            }
        });
    }
}