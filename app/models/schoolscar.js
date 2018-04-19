var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('SchoolsCar', new Schema({
    school_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
    car_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},    
    car_number:        {type: String, required:true}, 
    car_color:         {type: String, required:true},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:1},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'SchoolsCar'
}));