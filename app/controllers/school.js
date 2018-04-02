const School = require('../models/school');
const Driver = require('../models/driver');

module.exports = {
    addSchool: addSchool,
    getSchool: getSchool,
    getSingleSchool:getSingleSchool,
    updateSchool: updateSchool,
    removeSchool: removeSchool
};

function addSchool(req, res) {

    let school = new School({
        name:              req.body.name,
        email:             req.body.email,
        mobile:            req.body.mobile,
        address:           req.body.address,
        city:              req.body.city,
        state:             req.body.state,
        country:           req.body.country,
        registration_no:   req.body.registration_no,
        license_no:        req.body.license_no
    });

    school.save(school).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'School has been saved successfully !',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save School !',
            error: error
        });
    });
}

function getSchool(req, res) {
    let query = req.body || {};
    if(req.body._id){
        School.findById(req.body._id).then((response) => {
            Driver.find({school: response._id}).then((drivers)=>{
                response.driver_list = drivers;
                res.status(200);
                return res.json({
                    success: true,
                    message: 'School fetched successfully !',
                    data: response
                });
            }).catch((error)=>{
                res.status(400);
                return res.json({
                    success:false,
                    message:'Unable to fetch state !',
                    error:error
                });
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch School !',
                error: error
            });
        });
    }
    else
    {
        School.find(query).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School fetched successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to fetch School !',
                error: error
            });
        });
    }
}

function getSingleSchool(req, res){
    School.findById(req.body._id).then((response) => {
        Driver.find({school: response._id}).then((drivers)=>{
            response.driver_list = drivers;
            res.status(200);
            return res.json({
                success: true,
                message: 'School fetched successfully !',
                data: response
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to fetch state !',
                error:error
            });
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch School !',
            error: error
        });
    });
}

function updateSchool(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to update school, Unique id(_id) not found !",
        });
    } else {
        School.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School has been updated successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unbale to update school !',
                error: error
            });
        });
    }
}

function removeSchool(req, res) {
    if(req.body._id == null){
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete school, unique id(_id) not found !'
        });
    } else {
        School.findByIdAndRemove(req.body._id).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'School has been deleted successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete school !',
                error: error
            });
        });
    }
}
