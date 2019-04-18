require('dotenv').load();
const http = require("http");
const app = require("./app");
const socket = require('socket.io');
const port = process.env.PORT || 5000;
const server = http.createServer(app);


server.listen(port,()=>{
    console.log("server started.. at :",process.env.PORT);
});
const io = socket(server);
const people = {};
io.on('connection', (socket) => {
    console.log(socket.handshake.query.token);
    //socket.id
    people[socket.handshake.query.token] = socket.id;

    socket.on("SEND_MESSAGE",function(data){
        console.log("=====>>>",data);
        // io.emit("RECEIVE_MESSAGE",data)
        io.to(people[data.receiver]).emit('RECEIVE_MESSAGE', data);
        io.to(people[data.sender]).emit('RECEIVE_MESSAGE', data);
        
    })
});