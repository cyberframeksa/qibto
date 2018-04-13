var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Booking', new Schema({
    order_id:          {type: String, required: true},
    amount:            {type: Number, required: true},
    status:            {type: String, required: true},
    car:               {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    package:           {type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true},
    user:              {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Booking'
}));