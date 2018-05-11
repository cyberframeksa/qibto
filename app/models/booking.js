var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Booking', new Schema({
    order_id:          {type: String, required: true},
    amount:            {type: Number, required: true},
    order_status:      {type: String, required: true},
    booking_type:      {type: Number, required: true},
    car_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'Car', default:null},
    car_brand_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand', required: true},
    car_type_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'CarType', required: true},
    ac_non_ac:         {type: Number, default:null},
    pickup_drop:       {type: Number, default:null},
    daily_drive:       {type: Number, default:null},
    course_duration:   {type: Number, default:null},
    package_id:        {type: mongoose.Schema.Types.ObjectId, ref: 'Package', default:null},
    user_id:           {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    school_id:           {type: mongoose.Schema.Types.ObjectId, ref: 'School', default:null},
    current_driver_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default:null},
    other_drivers:     {type: Object, default:null},
    time_preferred:     {type: String, default:null},
    time_optional:     {type: String, default:null},
    created_at:        {type: Date, default:new Date()},
    updated_at:        { type: Date, default: new Date() },
    start_date:        {type: Date, default:null},
    end_date:          {type: Date, default: new Date()},
    status:            {type: Number, default:0},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'Booking'
}));