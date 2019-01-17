const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:"First Name is required"
    },
    lastName:{
        type:String,
        required:true
    },
    abbrName:String,
    skllSets:String,
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
module.exports = mongoose.model("User",userSchema);