const Country = require('../models/country');
const State = require('../models/state');
const City = require('../models/city');
const config = require('../config');

module.exports = {
    addAllCountry: addAllCountry,
    getAllCountry: getAllCountry,
    addCountry : addCountry,
    addAllState: addAllState,
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
    disableCity:disableCity,
    removeCountry:removeCountry
}

function addAllState(req, res){
    var list = Array();
    var success_count=0;
    var failed_count=0;
    var request = require('request');
    request('http://battuta.medunes.net/api/city/in/search/?region=State%20of%20Himachal%20Pradesh&key=de51b522bd8093762a3195b4fececcf2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            list = JSON.parse(body);
            console.log('Total Item ', list.length);
            list.forEach(element => {
                var city = new City({
                    state_id: '5abb8952834a70fd2232a50e',
                    city_name: element.city
                });
                city.save(city).then((res)=>{
                    success_count++;
                    console.log(`Success ${success_count}`, res);
                }).catch((error)=>{
                    failed_count++;
                    console.log(`Failed ${failed_count}`, error);
                });
            });
            res.status(200);
            return res.json({
                success:true,
                message:'Data Added Successfully !'
            });
        }
    });
}

function addAllCountry(req, res){
   var list = Array();
    var success_count=0;
    var failed_count=0;
    var request = require('request');
    request('http://battuta.medunes.net/api/city/in/search/?region=State%20of%20Himachal%20Pradesh&key=de51b522bd8093762a3195b4fececcf2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            list = JSON.parse(body);
            console.log('Total Item ', list.length);
            list.forEach(element => {
                var city = new City({
                    state_id: '5abb8952834a70fd2232a50e',
                    city_name: element.city
                });
                city.save(city).then((res)=>{
                    success_count++;
                    console.log(`Success ${success_count}`, res);
                }).catch((error)=>{
                    failed_count++;
                    console.log(`Failed ${failed_count}`, error);
                });
            });
            res.status(200);
            return res.json({
                success:true,
                message:'Data Added Successfully !'
            });
        }
    });
}

function getAllCountry(req, res){
    Country.find().then((countries)=>{
        res.status(200);
        return res.json({
            success:true,
            message:'Countries fetched successfully !',
            countries: countries
        });
    }).catch((error)=>{
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to fetch countries !',
            error:error
        });
    });
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
    if(req.body.country_id==null || req.body.country_name==null){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update country !',
            error: 'Required field error !'
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
    if(req.body.state_id==null || req.body.state_name==''){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update state !',
            error: 'Required field error !'
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
    if(req.body.city_id==null || req.body.city_name==null){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to update city !',
            error: 'Required field error !'
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
    console.log(req.body.country_id);
    if(!req.body.country_id){
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


function removeCountry(req, res){
    if(!req.body.country_id){
        res.status(400);
        return res.json({
            success:false,
            message:'Unable to delete, Unique id(country_id) not found !'
        });
    }
    else{
        Country.findById(req.body.country_id, function (err, country) {
            if (err) throw err;
            if(!country){
                res.status(400);
                return res.json({
                    success:false,
                    message:"Unable to delete, Country not found !",
                });
            }
            else{
                Country.findByIdAndRemove(req.body.country_id, (err, country) => {
                    if(err) throw err;
                    res.status(200);
                    return res.json({
                        success:true,
                        message:"Country deleted successfully !",
                    });
                });
            }
        });
    }
}
