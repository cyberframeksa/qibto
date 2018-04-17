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
        school_id: req.body.school_id,
        car_brand_id:  req.body.car_brand_id,
        car_type_id:  req.body.car_type_id,
        car_name: req.body.car_name,
        ac_availability: req.body.ac_availability
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
    var data = req.body.data || {};
    Car.find(data, function (err, car) {
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
                message:"Unable to fetch, Car not found !"
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
            message:'Unable to update car, Unique id(_id) not found !'
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
            message:'Unable to remove car, Unique id(_id) not found !'
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