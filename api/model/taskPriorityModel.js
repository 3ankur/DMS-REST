const mongoose = require("mongoose");

const TaskPriority = new mongoose.Schema({
    priority:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("TaskPriority",TaskPriority);