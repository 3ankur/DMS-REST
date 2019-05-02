const express = require("express");
const app = express();
const helmet = require('helmet');
require('express-async-errors');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserRoute = require("./api/routes/Users");
const ProjectRoute = require("./api/routes/ProjectRoute");
const mongoConnection = require('./mongo.config');

const Profiler = require("./api/routes/profiler");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/v1', router);

app.use(helmet());
app.use((req,res,next)=>{
    //console.log(req.headers)
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', '*');
  //X-Requested-With,Content-Type,authorization
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      mongoConnection();
      next();
});

//app.use(morgan('dev')); 'uploads/', 
app.use(express.static('uploads'));
//pp.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}));


app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:50000}));

app.use("/user",UserRoute);
app.use("/project",ProjectRoute);
app.use("/profiler",Profiler);





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
