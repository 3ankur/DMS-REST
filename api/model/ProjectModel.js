const mongoose = require("mongoose");

const Project = new mongoose.Schema({
    projectName:{
        type:String,
        required:true
    },
    description:String
},{timestamps:true})

module.exports = mongoose.model("project",Project);