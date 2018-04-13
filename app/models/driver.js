var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Driver', new Schema({
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true, select: false },
    mobile:            {type: Number, required:true},
    address:           {type: String, required:true},
    city:              {type: String, required:true},
    state:             {type: String, required:true},
    country:           {type: String, required:true},
    school:            {type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true},
    __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Driver'
}));