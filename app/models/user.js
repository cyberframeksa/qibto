var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

module.exports = mongoose.model('User', new Schema({
    first_name:         {type: String, required:true },
    last_name:          {type: String, required:true },
    gender:             {type: String, required:true },
    dob:                {type: String, required:true },
    mobile:             {
                            type: Number, 
                            validate: {
                                validator: function(v) {
                                    var re = /^\d{10}$/;
                                    return (re.test(v));
                                },
                                message: 'User mobile number is invalid !'
                            },
                            required:  [true, 'User mobile number is required !'] 
                        },
    email:              {
                            type: String,
                            trim: true,
                            lowercase: true,
                            unique: true,
                            required: 'Email address is required',
                            validate: [validateEmail, 'Please fill a valid email address !'],
                            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
                            required: [true, 'User email address is required !']
                        },
    password:           {type: String, required:true },
    alt_mobile:         {type: Number, default:null },    
    blood_group:        {type: String, default:null },    
    address:            {type: String, default:null },
    area:               {type: String, default:null },
    city:               {type: mongoose.Schema.Types.ObjectId, ref: 'City', default:null},
    state:              {type: mongoose.Schema.Types.ObjectId, ref: 'State', default:null},
    country:            {type: mongoose.Schema.Types.ObjectId, ref: 'Country',default:null},
    pincode:            {type: Number, default:null  },
    l_license:          {type: String, default:null },
    aadhar:             {type: Number, default:null },
    joining_date:       {type: Date, default:new Date()},
    created_at:         {type: Date, default:new Date()},
    updated_at:         {type: Date, default:new Date()},
    status:             {type: Number, default:1},
    __v: { type: Number, select: false}
}, 
{
    collection: 'User'
}));