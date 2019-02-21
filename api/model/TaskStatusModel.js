const mongoose = require("mongoose");

const TaskStatus = new mongoose.Schema({
    status:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("TaskStatus",TaskStatus);