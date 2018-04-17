var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Training', new Schema({
    user_id:       {type: String, required:true },
    schedule_date: {type: String, required:true},
    absent_date:   {type: String, required:true},
    present_date:  {type: String, required:true},
    created_at:                     {type: Date, default:new Date()},
    updated_at:                     {type: Date, default:new Date()},
      status:              { type: Number, default:0},
        __v: { type: Number, select: false}
}, 
{
    collection: 'Training'
}));