var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Notification', new Schema({
    booking_id:       {type: String, required:true},
    user_id:          {type: String, required:true},
    message:          {type: String, required:true},
    notification_status:           {type: String, default:'New'},
    isResolved:        {type: Boolean, default:false},
      status:              { type: Number, default:0},
        __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'Notification'
}));