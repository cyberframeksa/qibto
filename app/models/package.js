var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Package', new Schema({
    car_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    plan_name:         {type: String, required:true },
    pick_drop:         {type: String, required:true },
    ac_availability:   {type: String, required:true },
    drive_daily:       {type: Number, required:true },
    plan_price:        {type: Number, required:true },
    course_duration:   {type: Number, required:true },
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:1},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'Package'
}));