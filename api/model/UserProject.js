const mongoose = require("mongoose");
const userProjectSchema = new mongoose.Schema({
   
    projectId:{
        type:String,
        required:true
    },
    user:{type:mongoose.Schema.Types.ObjectId,
         ref:"AllUserInfo",
         required:true}
         ,
    isActive:Boolean
   
},{ timestamps:true});
module.exports = mongoose.model("UserAssignedProject",userProjectSchema,"userassignedproject");