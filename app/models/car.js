var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Car', new Schema({
    car_brand:         {type: String, required:true},
    car_type:          {type: String, required:true},
    car_name:          {type: String, required:true},
    pickup_drop_price: {type: Number, required:true}
}, 
{
    timestamps: true,
    collection: 'Car'
}));