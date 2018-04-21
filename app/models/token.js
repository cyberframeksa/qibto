var mongoose = require('mongoose');

var TokenSchema = mongoose.Schema({
    token:  { type: String },
    userId: { type: String, ref: 'User' },
    email:  { type: String, ref: 'User' },
    created_at:  {type: Date, default:new Date()},
    updated_at:  {type: Date, default:new Date()},
    __v: { type: Number, select: false}
}, 
{
    collection: "Token"
});

var Token = module.exports = mongoose.model('Token', TokenSchema);
