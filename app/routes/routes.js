const express = require('express');
const routes = express.Router();

const adminRoutes = require('./admin.routes');
const userRoutes = require('./user.routes');
const packageRoutes = require('./package.routes');
const carRoutes = require('./car.routes');
const carBrandRoutes = require('./car_brand.routes');
const carTypeRoutes = require('./car_type.routes');
const worldRoutes = require('./world.routes');
const schoolRoutes = require('./school.routes');
const driverRoutes = require('./driver.routes');
const bookingRoutes = require('./booking.routes');
const notificationRoutes = require('./notification.routes');

routes.use('/admin', adminRoutes);
routes.use('/users', userRoutes);
routes.use('/package', packageRoutes);
routes.use('/car', carRoutes);
routes.use('/carbrand', carBrandRoutes);
routes.use('/cartype', carTypeRoutes);
routes.use('/world', worldRoutes);
routes.use('/school', schoolRoutes);
routes.use('/driver', driverRoutes);
routes.use('/booking', bookingRoutes);
routes.use('/notification', notificationRoutes);

routes.get('/', function(req, res){ 
    res.status(200);
    res.json({ 
        success:true,
        message: 'Welcome to the coolest API on the earth!' 
    });
    
});

module.exports = routes;