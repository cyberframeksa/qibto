const CarType = require('../models/car_type');

module.exports = {
    AddCarType:AddCarType,
    GetCarType:GetCarType,
    UpdateCarType:UpdateCarType,
    RemoveCarType:RemoveCarType
}

function AddCarType(req, res){
    
    var cartype = new CarType({
        car_type: req.body.car_type,        
        car_type_price: req.body.car_type_price,
        ac_price: req.body.ac_price,
        pickup_price: req.body.pickup_price,
        daily_drive_price: req.body.daily_drive_price      
    });

    cartype.save(cartype).then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Car type added successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to add car type !',
            error: err
        });
    });
}

function GetCarType(req, res){
    let data = req.body.data || {};
    CarType.find(data).then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Car type fetched successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch car type !',
            error: err
        });
    });
}

function UpdateCarType(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update car type, Unique id(_id) is required !'
        });
    }
    else{
        CarType.findById(req.body._id).then((response1)=>{
            CarType.findByIdAndUpdate(req.body._id, req.body, {new:true}).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Car type updated successfully !',
                    data: response2
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update car type !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update car type !',
                error: err
            });
        });
    }
}

function RemoveCarType(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove car type, Unique id(_id) is required !'
        });
    }
    else{
        CarType.findById(req.body._id).then((response1)=>{
            CarType.findByIdAndRemove(req.body._id).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Car type removed successfully !',
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to remove car type !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to remove car type !',
                error: err
            });
        });
    }
}