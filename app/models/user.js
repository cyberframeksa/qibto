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
    blood_group:        {type: String, default:null },
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
    alt_mobile:         {
                            type: Number,
                            default:null
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
    password:           {type: String, default:null },
    address:            {type: String, required:true },
    area:               {type: String, default:null },
    city:               {type: String, default:null },
    state:              {type: String, default:null },
    country:            {type: String, default:null },
    pincode:            {
                            type: Number,
                            default:null
                        },
    l_license:          {type: String, default:null },
    aadhar:             {type: Number, default:null },
    joining_date:       {type: String, default:null },
    car_name:           {type: String, default:null },
    car_no:             {type: String, default:null },
    trainer_name:       {type: String, default:null },
    trainer_mobile:     {
                            type: Number,
                            default:null
                        },
    course_duration:    {type: Number, default:null },
    training_time:      {type: String, default:null },
    training_location:  {type: String, default:null },
    __v: { type: Number, select: false}
}, 
{
    timestamps: true,
    collection: 'User'
}));