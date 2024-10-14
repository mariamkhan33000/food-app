const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require: [true, 'user name is required']
    },
    email: { 
            type: String,
            require: [true, 'email is required']
        },
    password: {
        type: String,
        require: [true, 'password is required'],

    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        require: [true, 'phone number is required']
    },
    userType: {
        type: String,
        require: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg'
    },
    answer: {
        type: String,
        require: [true, "Answer is required"], 
    }
    
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema)