const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    }, 
    password : {
        type : String,
        required : true
    }, 
    telephon : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    postCode : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true,
        // enum : ['US', 'AU']
    },
    state : {
        type : String,
        required : true
    },
    bYear : {
        type : Number,
        required : true,
        trim : true 
    },
    bMonth : {
        type : Number,
        required : true,
        trim : true 
    },
    bDay : {
        type : Number,
        required : true,
        trim : true 
    },
    randomOTP : {
        type : String,
        default : null,
    },
  
})

module.exports = mongoose.model('User',userSchema)