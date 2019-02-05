const mongoose = require("mongoose");
const Tasks = new mongoose.Schema({
    title: {
        type: string,
        required: true
    },
    summary: {
        type: string,
        required: true
    },
    priority: {
        type: string,
        required: true
    },
    dueDate: {
        type: string,
        required: true
    },
    assignTo: {
        type: string,
        required: true
    },
    description: {
        type: string,
        required: true
    },
    project:{type:mongoose.Schema.Types.ObjectId,ref:"project",required:true}

});