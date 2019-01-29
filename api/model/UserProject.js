const mongoose = require("mongoose");
const userProjectSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,ref:"UserRegistered",
        required:"User Id  is required"
    },
    projectId:{
        type:String,
        required:true
    },
    isActive:Boolean
   
},{ timestamps:true});
module.exports = mongoose.model("UserProject",userProjectSchema);