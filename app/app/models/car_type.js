var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CarType', new Schema({
    car_type: {type: String, required: true},
    car_name: {type: String, required: true},
    status:   {type: Number, default:0},
    __v:      { type: Number, select: false}
},
{
    timestamps:true,
    collection: 'CarType'
}));