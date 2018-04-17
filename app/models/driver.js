var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true},
    mobile:            {type: Number, required:true},
    address:           {type: String, required:true},
    city:              {type: String, required:true},
    state:             {type: String, required:true},
    country:           {type: String, required:true},
    school_id:            {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
      status:              { type: Number, default:0},
        __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Driver'
}));