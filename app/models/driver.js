var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true},
    mobile:            {type: Number, required:true},
    address:           {type: String, required:true},
    school_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},
    status:            {type: Number, default:1},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'Driver'
}));