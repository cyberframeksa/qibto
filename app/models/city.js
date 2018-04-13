var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('City', new Schema({
    state_id  : { type: Schema.Types.ObjectId, ref: 'State', required:true },
    city_name : { type: String, required:true },
    enable    : { type: Boolean, default:true },
    __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'City'
}));