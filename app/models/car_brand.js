var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('CarBrand', new Schema({
    brand_name:        {type: String, required:true},
    created_at:        {type: Date, default:new Date()},
    updated_at:        {type: Date, default:new Date()},    
    status:            {type: Number, default:1},
    __v:               {type: Number, select: false}
}, 
{
    collection: 'CarBrand'
}));