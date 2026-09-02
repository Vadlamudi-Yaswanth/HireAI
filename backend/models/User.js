const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minlength:6
    },
    role:{
        type:String,
        default:"recruiter",
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});
UserSchema.pre('save', async function() {
    // If the password field wasn't changed, skip out of the function
    if (!this.isModified('password')) {
        return; 
    }
    
    // Generate a secure salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
