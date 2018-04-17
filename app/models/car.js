var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Car', new Schema({
    school_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
    car_brand_id:      {type: mongoose.Schema.Types.ObjectId, ref: 'CarBrand', required: true},    
    car_type_id:       {type: mongoose.Schema.Types.ObjectId, ref: 'CarType', required: true},
    car_name:          {type: String, required:true}, 
    ac_availability:   {type: String, required:true},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:0},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'Car'
}));