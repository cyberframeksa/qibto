const Driver = require('../models/driver');

module.exports = {
    addDriver: addDriver,
    getDriver: getDriver,
    updateDriver: updateDriver,
    removeDriver: removeDriver
};

function addDriver(req, res) {

    let driver = new Driver({
        name:               req.body.name,
        email:              req.body.email,
        password:           req.body.password,
        mobile:             req.body.mobile,
        address:            req.body.address,
        city:               req.body.city,
        state:              req.body.state,
        country:            req.body.country,
        school:             req.body.school
    });

    driver.save(driver).then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Driver has been saved successfully !',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to save driver !',
            error: error
        });
    });
}

function getDriver(req, res) {
    let query = req.body || {};
    Driver.find(query).populate('school').then((response) => {
        res.status(200);
        return res.json({
            success: true,
            message: 'Driver fetched successfully !',
            data: response
        });
    }).catch((error) => {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to fetch driver !',
            error: error
        });
    });
}

function updateDriver(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: "Unable to update Driver, Unique id(_id) not found !",
        });
    } else {
        Driver.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Driver has been updated successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unbale to update Driver !',
                error: error
            });
        });
    }
}

function removeDriver(req, res) {
    if (req.body._id == null) {
        res.status(400);
        return res.json({
            success: false,
            message: 'Unable to delete driver, unique id(_id) not found !'
        });
    } else {
        Driver.findByIdAndRemove(req.body._id).then((response) => {
            res.status(200);
            return res.json({
                success: true,
                message: 'Driver has been deleted successfully !',
                data: response
            });
        }).catch((error) => {
            res.status(400);
            return res.json({
                success: false,
                message: 'Unable to delete Driver !',
                error: error
            });
        });
    }
}
