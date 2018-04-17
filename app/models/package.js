var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Package', new Schema({
    car:               {type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true},
    plan_name:         {type: String, required:true },
    pick_drop:         {type: String, required:true },
    ac_non_ac:         {type: String, required:true },
    drive_daily:       {type: Number, required:true },
    plan_price:        {type: Number, required:true },
    course_duration:   {type: Number, required:true },
      status:              { type: Number, default:0},
        __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Package'
}));