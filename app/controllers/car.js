const Car = require('../models/car');
const config = require('../config');

module.exports = {
    addCar: addCar,
    getCar: getCar,
    updateCar: updateCar,
    removeCar: removeCar  
}

function addCar(req, res) {
    
    var newCar = new Car({
        car_brand: req.body.car_brand,
        car_type:  req.body.car_type,
        car_name:  req.body.car_name,
        pickup_drop_price: req.body.pickup_drop_price
    });

    newCar.save((err, car) => {
        if (err) throw err;
        res.status(200);
        return res.json({
            success: true,
            message: 'Car added successfully !',
            data: car
        });
    }, (err)=>{
        res.status(400);
        return res.json({
            success:false,
            error: err
        });
    });
}

function getCar(req, res){
    Car.find(req.body, function (err, car) {
        if (err) throw err;
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

function updateCar(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Car.findById(req.body._id, function (err, car) {
            if (err) throw err;
            if(!car){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to update, Car not found !",
                });
            }
            else{
                Car.findByIdAndUpdate(req.body._id, {$set: req.body}, {new:true}, (err, car) => {
                    if(err) throw err;
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

function removeCar(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update, Unique id not found !'
        });
    }
    else{
        Car.findById(req.body._id, function (err, car) {
            if (err) throw err;
            if(!car){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to delete, Car not found !",
                });
            }
            else{
                Car.findByIdAndRemove(req.body._id, (err, car) => {
                    if(err) throw err;
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Car deleted successfully !",
                    });
                });
            }
        });
    }
}