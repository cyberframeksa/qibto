var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School', new Schema({
    owner:             {type: Object, required:true},
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true},
    mobile:            {type: Number, required:true},
    address:           {type: String, required:true},
    city:              {type: String, required:true},
    state:             {type: String, required:true},
    country:           {type: String, required:true},
    registration_no:   {type: String, required:true},
    license_no:        {type: String, required:true},
    license_image:     {type: String, required:true},
    logo:              {type: String, default:null},   
    alt_mobile:        {type: Number, default:null },     
    isVerified:        {type:Boolean, default:false},
    status:            {type:Number, default:0 },
    __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'School'
}));