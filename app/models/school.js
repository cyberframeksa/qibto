var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('School', new Schema({
    logo:              {type: String, default:null },
    name:              {type: String, required:true},
    email:             {type: String, required:true},
    password:          {type: String, required:true},
    mobile:            {type: Number, required:true},
    alt_mobile:        {type: Number, default:null},
    address:           {type: String, required:true},
    city:              {type: String, required:true},
    state:             {type: String, required:true},
    country:           {type: String, required:true},
    registration_no:   {type: String, required:true},
    license_no:        {type: String, required:true},
    license_image:     {type: String, default:null},
    driver_list:       {type: Object, default:null}
}, 
{
    timestamps: true,
    collection: 'School'
}));