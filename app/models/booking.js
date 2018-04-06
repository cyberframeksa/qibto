var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Booking', new Schema({
    order_id:          {type: String, required: true},
    amount:            {type: Number, required: true},
    status:            {type: String, required: true},
    car:               {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    package:           {type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true},
    school:            {type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null},
    driver:            {type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null},
    user:              {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, 
{
    timestamps: true,
    collection: 'Booking'
}));