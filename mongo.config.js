require('dotenv').load();
const mongoose = require("mongoose");
var mongodbErrorHandler = require('mongoose-mongodb-errors');
mongoose.plugin(mongodbErrorHandler);
mongoose.Promise = global.Promise;

// mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true },()=>{
//     console.log("Connectioned with mongoDB",process.env.MONGO_URI);
// })


var doConnection = function(){
    mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true },()=>{
        console.log("Connectioned with mongoDB",process.env.MONGO_URI);
    })
}
doConnection();

module.exports = doConnection;