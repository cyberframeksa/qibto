var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Notification', new Schema({
    booking_id:                     {type: String, required:true},
    user_id:                        {type: String, required:true},
    message:                        {type: String, required:true},
    notification_status:            {type: String, default:'New'},
    isResolved:                     {type: Boolean, default:false},
    created_at:                     {type: Date, default:new Date()},
    updated_at:                     {type: Date, default:new Date()},
    status:                         {type: Number, default:0},
    __v:                            {type: Number, select: false}
}, 
{
    collection: 'Notification'
}));