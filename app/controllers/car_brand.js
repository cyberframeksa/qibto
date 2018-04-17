const CarBrand = require('../models/car_brand');

module.exports = {
    AddCarBrand:AddCarBrand,
    GetCarBrand:GetCarBrand,
    UpdateCarBrand:UpdateCarBrand,
    RemoveCarBrand:RemoveCarBrand
}

function AddCarBrand(req, res){
    
    var carbrand = new CarBrand({
        brand_name: req.body.brand_name
    });

    carbrand.save(carbrand).then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Car brand added successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to add car brand !',
            error: err
        });
    });
}

function GetCarBrand(req, res){
    let data = req.body.data || {};
    CarBrand.find(data).then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Car brand fetched successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch car brand !',
            error: err
        });
    });
}

function UpdateCarBrand(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update car brand, Unique id(_id) is required !'
        });
    }
    else{
        CarBrand.findById(req.body._id).then((response1)=>{
            CarBrand.findByIdAndUpdate(req.body._id, req.body, {new:true}).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Car brand updated successfully !',
                    data: response2
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update car brand !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update car brand !',
                error: err
            });
        });
    }
}

function RemoveCarBrand(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove car brand, Unique id(_id) is required !'
        });
    }
    else{
        CarBrand.findById(req.body._id).then((response1)=>{
            CarBrand.findByIdAndRemove(req.body._id).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Car brand removed successfully !',
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to remove car brand !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to remove car brand !',
                error: err
            });
        });
    }
}