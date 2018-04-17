var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CarType', new Schema({
    car_type:          {type: String, required: true},
    car_type_price:    {type: Number, required: true},
    ac_price:          {type: Number, required: true},
    pickup_price:      {type: Number, required: true},
    daily_drive_price: {type: Number, required: true},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:0},
    __v:               {type: Number, select: false}
},
{
    collection: 'CarType'
}));