const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');
const config = require('../config');

module.exports = {
    addCountry : addCountry,
    addState   : addState,
    addCity    : addCity,
    getCountry : getCountry,
    getState   : getState,
    getCity    : getCity,
    updateCountry:  updateCountry,
    updateState: updateState,
    updateCity:updateCity,
    disableCountry:disableCountry,
    disableState:disableState,
    disableCity:disableCity
}

function addCountry(req, res){
    var country = new Country({
        country_name:req.body.country_name
    });

    country.save((error, country)=>{
        if(error)
        {
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to add country !',
                error: error
            });
        }
        else
        {
            res.status(200);
            return res.json({
                success: true,
                message: 'Country has been added !',
                country: country
            });
        }
    }, (error)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to add country, Please try again !',
            error: error
        });
    });
}

function addState(req, res){
    var state = new State({
        country_id:req.body.country_id,
        state_name:req.body.state_name
    });

    state.save((error, state)=>{
        if(error)
        {
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to save state !',
                error: error
            });
        }
        else
        {
            res.status(200);
            return res.json({
                success: true,
                message: 'State has been saved !',
                state: state
            });
        }
    }, (error)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to save state, Please try again !',
            error: error
        });
    });
}

function addCity(req, res) {
    var city = new City({
        country_id:req.body.country_id,
        state_id  :req.body.state_id,
        city_name :req.body.city_name
    });

    city.save((error, city)=>{
        if(error)
        {
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to save city !',
                error: error
            });
        }
        else
        {
            res.status(200);
            return res.json({
                success: true,
                message: 'City has been saved !',
                city: city
            });
        }
    }, (error)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to save city, Please try again !',
            error: error
        });
    });
}

function getCountry(req, res){
    if(req.body.country_id==null || req.body.country_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch country !',
            error: 'Unique id (country_id) not found !'
        });
    }
    else
    {
        Country.findOne({_id:req.body.country_id, enable:true}).then((country)=>{
            State.find({country_id: country._id}).then((states)=>{
                var total_state = Array();
                states.forEach(state => {
                    var data = {
                        _id       : state._id,
                        state_name: state.state_name
                    }
                    total_state.push(data);
                });
                res.status(200);
                return res.json({
                    success:true,
                    message:'Country fetched successfully !',
                    country_id: country._id,
                    country_name: country.country_name,
                    state_list: total_state
                });
            }).catch((error)=>{
                res.status(400);
                return res.json({
                    success:false,
                    message:'Unable to fetch state !',
                    error:error
                });
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to fetch country !',
                error:'No record found with this country id !'
            });
        });
    }
}

function getState(req, res){
    if(req.body.state_id==null || req.body.state_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch state !',
            error: 'Unique id (state_id) not found !'
        });
    }
    else
    {
        State.findOne({_id:req.body.state_id, enable:true}).then((state)=>{
            City.find({state_id: state._id}).then((cities)=>{
                var total_city = Array();
                cities.forEach(city => {
                    var data = {
                        _id       : city._id,
                        city_name : city.city_name
                    }
                    total_city.push(data);
                });
                res.status(200);
                return res.json({
                    success:true,
                    message:'State fetched successfully !',
                    state_id: state._id,
                    state_name: state.state_name,
                    city_list: total_city
                });
            }).catch((error)=>{
                res.status(400);
                return res.json({
                    success:false,
                    message:'Unable to fetch city !',
                    error:error
                });
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to fetch state !',
                error:'No record found with this state id !'
            });
        });
    }
}

function getCity(req, res){
    if(req.body.city_id==null || req.body.city_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch city !',
            error: 'Unique id (city_id) not found !'
        });
    }
    else
    {
        City.findOne({_id:req.body.city_id, enable:true}).then((city)=>{
            if(city)
            {
                res.status(200);
                return res.json({
                    success:true,
                    message:'City fetched successfully !',
                    city:city
                });
            }
            else
            {
                res.status(400);
                return res.json({
                    success:false,
                    message:'Unable to fetch city !',
                    error:'No record found with this city id !'
                });
            }
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to fetch city !',
                error:'No record found with this city id !'
            });
        });
    }
}

function updateCountry(req, res){
    if(req.body.country_id==null || req.body.country_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update country !',
            error: 'Unique id (country_id) not found !'
        });
    }
    else
    {
        Country.findByIdAndUpdate(req.body.country_id, {country_name: req.body.country_name, enable: true}, {new:true}).then((country)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'Country updated successfully !',
                country:country
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update country !',
                error:'No record found with this country id !'
            });
        });
    }
}

function updateState(req, res){
    if(req.body.state_id==null || req.body.state_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update state !',
            error: 'Unique id (state_id) not found !'
        });
    }
    else
    {
        State.findByIdAndUpdate(req.body.state_id, {state_name: req.body.state_name, enable:true}, {new:true}).then((state)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'State updated successfully !',
                state:state
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update state !',
                error:'No record found with this state id !'
            });
        });
    }
}

function updateCity(req, res){
    if(req.body.city_id==null || req.body.city_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update city !',
            error: 'Unique id (city_id) not found !'
        });
    }
    else
    {
        City.findByIdAndUpdate(req.body.city_id, {city_name: req.body.city_name, enable:true}, {new:true}).then((city)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'City updated successfully !',
                city:city
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to update city !',
                error:'No record found with this city id !'
            });
        });
    }
}

function disableCountry(req, res){
    if(req.body.country_id==null || req.body.country_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to disable country !',
            error: 'Unique id (country_id) not found !'
        });
    }
    else
    {
        Country.findByIdAndUpdate(req.body.country_id, {enable: false}, {new:true}).then((country)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'Country disabled successfully !',
                country:country
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to disable country !',
                error:'No record found with this country id !'
            });
        });
    }
}

function disableState(req, res){
    if(req.body.state_id==null || req.body.state_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to disable state !',
            error: 'Unique id (state_id) not found !'
        });
    }
    else
    {
        State.findByIdAndUpdate(req.body.state_id, {enable:false}, {new:true}).then((state)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'State disabled successfully !',
                state:state
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to disable state !',
                error:'No record found with this state id !'
            });
        });
    }
}

function disableCity(req, res){
    if(req.body.city_id==null || req.body.city_id==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to disable city !',
            error: 'Unique id (city_id) not found !'
        });
    }
    else
    {
        City.findByIdAndUpdate(req.body.city_id, {enable:false}, {new:true}).then((city)=>{
            res.status(200);
            return res.json({
                success:true,
                message:'City disabled successfully !',
                city:city
            });
        }).catch((error)=>{
            res.status(400);
            return res.json({
                success:false,
                message:'Unable to disable city !',
                error:'No record found with this city id !'
            });
        });
    }
}

