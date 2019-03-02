const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:"First Name is required"
    },
    fname:{
        type:String,
        required:true
    },
    lname:String,
    age:String});
module.exports = mongoose.model("users",userSchema);