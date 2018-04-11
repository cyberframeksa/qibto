var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Notification', new Schema({
    booking_id:       {type: String, required:true},
    user_id:          {type: String, required:true},
    message:          {type: String, required:true},
    status:           {type: String, default:'New'},
    isReolved:        {type: Boolean, default:false}
}, 
{
    timestamps: true,
    collection: 'Notification'
}));