const SchoolsCar = require('../models/schoolscar');

module.exports = {
    AddSchoolsCar:AddSchoolsCar,
    GetSchoolsCar:GetSchoolsCar,
    GetUserSchoolsCar: GetUserSchoolsCar,
    UpdateSchoolsCar:UpdateSchoolsCar,
    RemoveSchoolsCar:RemoveSchoolsCar
}

function AddSchoolsCar(req, res){
    
    var schoolsCar = new SchoolsCar({
        school_id: req.body.school_id,        
        car_id: req.body.car_id,
        car_number: req.body.car_number,
        car_color: req.body.car_color
    });

    schoolsCar.save(schoolsCar).then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Schools car added successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to add schools car !',
            error: err
        });
    });
}

function GetSchoolsCar(req, res){
    let data = req.body.data || {};
    SchoolsCar.find(data).populate('car_id').then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Schools car fetched successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch schools car !',
            error: err
        });
    });
}

function GetUserSchoolsCar(req, res){
    let data = req.body.data || {};
    SchoolsCar.find(data).populate('car_id').then((response)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Schools car fetched successfully !',
            data: response
        });
    }).catch((err)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch schools car !',
            error: err
        });
    });
}

function UpdateSchoolsCar(req, res){
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update schools car, Unique id(_id) is required !'
        });
    }
    else{
        
        SchoolsCar.findById(req.body._id).then((response1)=>{
            SchoolsCar.findByIdAndUpdate(req.body._id, req.body, {new:true}).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Schools car updated successfully !',
                    data: response2
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to update schools car !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update schools car !',
                error: err
            });
        });
    }
}

function RemoveSchoolsCar(req, res){
    // SchoolsCar.remove().then((response)=>{
    //     res.status(200);
    //     return res.json({
    //         success:true,
    //         message: 'Schools car removed successfully !',
    //     }); 
    // }).catch((err)=>{
    //     res.status(400);
    //     return res.json({
    //         success: false,
    //         message: 'Unable to remove schools car !',
    //         error: err
    //     });
    // });
    if(!req.body._id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to remove schools car, Unique id(_id) is required !'
        });
    }
    else{
        SchoolsCar.findById(req.body._id).then((response1)=>{
            SchoolsCar.findByIdAndRemove(req.body._id).then((response2)=>{
                res.status(200);
                return res.json({
                    success:true,
                    message: 'Schools car removed successfully !',
                });
            }).catch((err)=>{
                res.status(400);
                return res.json({
                    success: false,
                    message: 'Unable to remove schools car !',
                    error: err
                });
            });
        }).catch((err)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to remove schools car !',
                error: err
            });
        });
    }
}