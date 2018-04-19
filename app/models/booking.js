var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Booking', new Schema({
    order_id:          {type: String, required: true},
    amount:            {type: Number, required: true},
    order_status:      {type: String, required: true},
    booking_type:      {type: Number, required: true},
    car_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    ac_availability:   {type: String, default:null},
    pickup_drop:       {type: String, default:null},
    daily_drive:       {type: String, default:null},
    course_duration:   {type: String, default:null},
    package_id:        {type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true},
    user_id:           {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    current_driver_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default:null},
    other_drivers:     {type: Object, default:null},
    training_time:     {type: String, default:null},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:1},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'Booking'
}));