const mongoose = require("mongoose");
const Tasks = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    assignTo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project:{type:mongoose.Schema.Types.ObjectId,ref:"project",required:true}

},{
    timestamps:true
});

module.exports = mongoose.model("task",Tasks);
