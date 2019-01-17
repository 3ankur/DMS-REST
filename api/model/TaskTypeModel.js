const mongoose = require("mongoose");

const TaskType = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("TaskType",TaskType);