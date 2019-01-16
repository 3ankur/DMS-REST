const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    abbrName:String,
    skllSets:String,
    email:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    createdDate:{
        type:String
    },
    updateDate:String
});
module.exports = mongoose.model("User",userSchema);