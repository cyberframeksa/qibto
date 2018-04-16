var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Car', new Schema({
    school_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
    car_brand_id:      {type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand', required: true},    
    car_type_id:       {type: mongoose.Schema.Types.ObjectId, ref: 'CarType', required: true},
    pickup_drop:       {type: String, required:true},
    pickup_drop_price: {type: Number, required:true},
    ac_non_ac:         {type: String, required:true},
    ac_non_ac_price:   {type: Number, required:true},
    status:            {type: Number, default:0},
    __v:               { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Car'
}));