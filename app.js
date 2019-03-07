const express = require("express");
const app = express();
require('express-async-errors');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserRoute = require("./api/routes/Users");
const ProjectRoute = require("./api/routes/ProjectRoute");
require('./mongo.config');


app.use(morgan('dev'));
app.use('uploads/', express.static('uploads/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",UserRoute);
app.use("/project",ProjectRoute);



//Not Found Route
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Routes not found");
    next(error);
  });

//error handeler
if(app.get("env")==="production"){
    app.use((error,req,res,next)=>{
        res.status(req.status || 500).send({
            message:error.message
        })
    })
}

app.use((error,req,res,next)=>{
    res.status(req.status || 500).send({
        message:error.message,
        stack:error.stack
    })

})

module.exports = app;
