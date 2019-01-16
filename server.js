require('dotenv').load();
const http = require("http");
const port = process.env.PORT || 5000;
const server = http.createServer();
server.listen(port,()=>{
    console.log("server started.. at :",process.env.PORT);
});