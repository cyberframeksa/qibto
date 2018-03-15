var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Country', new Schema({
    country_name: {  type: String, required:true },
    enable      : {  type: Boolean, default:true }
}, 
{
    timestamps: true,
    collection: 'Country'
}));