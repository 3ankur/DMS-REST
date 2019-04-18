const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require('csv-parser');  
const fs = require('fs');
const path = require('path');
var mime = require('mime');
const nodemailer = require("nodemailer");
const appJSON = [{"id":1,"name":"Rave","info":"Rave","value":"Rave","label":"Rave","versions":[{"id":"RAVE_V_1_0","name":"V1.0","rules":[{"id":"1","ruleId":"1","ruleCheck":"study id can not be null","tableName":"Study","columnName":"STUDY_ID","description":"check study number is null or not ","ruleType":"NULL CHECK"},{"id":"2","ruleId":"2","description":"check study name is null or not ","ruleCheck":"study name can not be null","tableName":"Study","columnName":"STUDY_NAME","ruleType":"NULL CHECK"},{"id":"3","ruleId":"3","description":"SUBJECT NAME CANT BE NULL","ruleCheck":"SUBJECT NAME CANT BE NULL","tableName":"SUBJECT INFO","columnName":"SUBJECT_NAME","ruleType":"NULL CHECK"},{"id":"4","ruleId":"4","description":"its the ","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"},{"id":"5","ruleId":"5","description":"study id can not be null","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"},{"id":"6","ruleId":"6","description":"its the ","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"}],"value":"V1.0"}]},{"id":3,"name":"CTMS","info":"CTMS","value":"CTMS","label":"CTMS","versions":[{"id":"CTMS_V_1_0","name":"V1.0","rules":[{"id":"1","ruleId":"1","ruleCheck":"study id can not be null","tableName":"Study","columnName":"STUDY_ID","description":"check study number is null or not ","ruleType":"NULL CHECK"},{"id":"2","ruleId":"2","description":"check study name is null or not ","ruleCheck":"study name can not be null","tableName":"Study","columnName":"STUDY_NAME","ruleType":"NULL CHECK"},{"id":"3","ruleId":"3","description":"SUBJECT NAME CANT BE NULL","ruleCheck":"SUBJECT NAME CANT BE NULL","tableName":"SUBJECT INFO","columnName":"SUBJECT_NAME","ruleType":"NULL CHECK"},{"id":"4","ruleId":"4","description":"its the ","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"},{"id":"5","ruleId":"5","description":"study id can not be null","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"},{"id":"6","ruleId":"6","description":"its the ","ruleCheck":"study id can not be null","tableName":"Study Info","columnName":"STUDY_DETAILS","ruleType":"NULL CHECK"}],"value":"V1.0"}]}];
const axios = require('axios');
var request = require('request');
const http = require('https');

// var j = Schedule.scheduleJob('* * * * *', function(){
//     console.log('The answer to life, the universe, and everything!');
//   });
//  console.log(j.nextInvocation())

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {

        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, file.originalname.replace(".","_")+"_"+Date.now() + ext)

      //cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({storage: storage,limits: {fileSize: 1000000}});
 
//for getting the project checkAuth
router.get("/",async (req,res)=>{
   // const projects = await Project.find({}).exec();
    res.send({})
});


//create new task
router.post("/addRules", upload.single("ruleFile"), async (req,res)=>{
    console.log(req.file,"==================>",req.file.filename);
    console.log(__dirname);
    try{
        const dataSet=[];
        if(req.file){
            fs.createReadStream("uploads/"+req.file.filename)  
      .pipe(csv())
      .on('data', (row) => {
        //console.log(row);
       // dataSet = row;
        dataSet.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
       // console.log(dataSet);

        main().catch(console.error);

        res.status(200).json({"msg":"Task Created",task:{},"rules":dataSet,"code":"HOLA--"})
      });
        }
            console.log("isd",dataSet);
       
    }
    catch(e){
        
        console.log(e);
        res.status(500).json({"msg":"Error",task:{},"Info":e,"code":{}})
        //throw e;
    }
   
    
});

router.get('/download/:name', function (req, res, next) {
    var filePath = "uploads/"+req.params.name; // Or format the path using the `id` rest param
    var fileName = req.params.name; // The default name the browser will use
console.log(filePath,"=============>",fileName);
    res.download(filePath, fileName);   //working 
  //  res.attachment(filePath);
 // var downFile = path.join(__dirname, "/uploads/"+req.params.name);
  //console.log(downFile);
  //  res.attachment(filePath);

//   var mimetype = mime.lookup(filePath);
//     res.setHeader('Content-disposition', 'attachment; filename=' + filePath);
//     res.setHeader('Content-type', mimetype);
  
//     var filestream = fs.createReadStream(filePath);
//     filestream.pipe(res);
});


router.get('/getSourceVersion/:sourceId', function (req, res, next) {
 if(req.params.sourceId){
   const filerResult = appJSON.filter((v)=>{return v.name ===req.params.sourceId});
   res.status(200).json({"msg":"Success",result:filerResult[0]["versions"],"Info":{},"code":{}})

 }

})

router.get("/request", async (req,res)=>{
// let URL = "https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=details&format=json";
// //const request = require('request');
// var headers = {
//   'Content-Type': 'application/json'
// }
// var options = {
//   url: URL,
//   method: 'GET',
//   headers: headers,
// }
// // request(options, function (error, response, body) {
// //   console.log(body,response,error)
// //   if (!error && response.statusCode == 200) {
      
// //       res.status(200).json({"data":body,"res":response})

// //   } else {
// //       console.log(body)
// //       res.status(200).json({"data":body})
// //   }
// // })


// http.get(URL, (resp) => {
//   let data = '';

//   // Concatinate each chunk of data
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // Once the response has finished, do something with the result
//   resp.on('end', () => {
//     res.json(JSON.parse(data));
//   });

//   // If an error occured, return the error to the user
// }).on("error", (err) => {
//   res.json("Error: " + err.message);
// });

let resData = await fetchImages();
res.json({"info": resData.data } );
});


fetchImages =()=> {
  return axios({
    method: 'get',
    url: 'https://api.flickr.com/services/rest',
    params: {
      method: 'flickr.photos.search',
      api_key: "a751743c271a70cabff1ffb226cfb26c", //config.api_key,
      tags: 'dog',
      extras: 'url_n, owner_name, date_taken, views',
      page: 1,
      format: 'json',
      nojsoncallback: 1,
      per_page: 30,
    }
  })
}



async function main(){
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'sys.dms.io.@gmail.com',
           pass: '!Password@123'
       }
   });

   const mailOptions = {
    from: 'sys.dms.io.@gmail.com', // sender address
    to: '3ankur.v@gmail.com', // list of receivers
    subject: 'Testing Nodemailder template ANK', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };

 await transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });

}
//get task dates
module.exports = router;