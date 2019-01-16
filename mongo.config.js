require('dotenv').load();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI,()=>{
    console.log("Connectioned with mongoDB");
})
