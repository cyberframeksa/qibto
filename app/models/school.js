var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School', new Schema({
    owner:             {type: Object, required:true},
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true},
    mobile:            {type: Number, required:true},
    address:           {type: String, required:true},
    city:              {type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true},
    state:             {type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true},
    country:           {type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true},
    registration_no:   {type: String, required:true},
    license_no:        {type: String, required:true},
    license_image:     {type: String, required:true},
    logo:              {type: String, default:null}, 
    alt_mobile:        {type: Number, default:null},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},     
    status:            {type: Number, default:0},
    __v: { type: Number, select: false}
}, 
{
    collection: 'School'
}));