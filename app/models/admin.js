var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

module.exports = mongoose.model('Admin', new Schema({
    name:         {type: String, required: [true, 'Name is required !'] },
    email:              {
                            type: String,
                            trim: true,
                            lowercase: true,
                            unique: true,
                            required: 'Email address is required',
                            validate: [validateEmail, 'Please fill a valid email address !'],
                            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
                            required: [true, 'Email address is required !']
                        },
    password:           {type: String, required: [true, 'Password is required !']},
    created_at:         {type: Date, default:new Date()},
    updated_at:         {type: Date, default:new Date()},
    status:             { type: Number, default:1},
    __v:                { type: Number, select: false }
}, 
{
    collection: 'Admin'
}));