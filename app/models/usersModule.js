const mongoose = require('mongoose');
const slugify = require('slugify')
const validator = require('validator')

// {name, email, photo, password, confirmPassword}

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please tell use your name']
    },
    
    // slug: String,

    email:{
        type:String,
        require:[true,'Please provide your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
    },

    photo:String,

    password:{
        type:String,
        require:[true,'Please provide a password'],
        minlength:6
    },
    passwordConfirm:{
        type:String,
        require:[true,'Please confirm your password'],
    },

    role:{
        type:String, 
        default: 'customer'
    },

},
{
    timestamps : true
})
 
const User = mongoose.model('User',userSchema); 
 module.exports = User;