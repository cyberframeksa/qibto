const express = require('express');
const routes = express.Router();

const userRoutes = require('./user.routes');
const packageRoutes = require('./package.routes');
const carRoutes = require('./car.routes');
const worldRoutes = require('./world.routes');

routes.use('/users', userRoutes);
routes.use('/package', packageRoutes);
routes.use('/car', carRoutes);
routes.use('/world', worldRoutes);

routes.get('/', function(req, res){ 
    res.status(200);
    res.json({ 
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
    
});

module.exports = routes;