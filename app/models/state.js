var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('State', new Schema({
    country_id: { type: Schema.Types.ObjectId, ref: 'Country', required:true },
    state_name: { type: String, required:true },
    enable    : { type: Boolean, default:true }
}, 
{
    timestamps: true,
    collection: 'State'
}));