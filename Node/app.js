const express=require('express')
const app=express();
const bodyParser=require('body-parser')
const router=require('./router/router');
const SocketControlle = require('./controler/SocketController');
const server=require('http').Server(app)
const io=require('socket.io')(server, {
    cors:{
        origin:"http://localhost:3000",
        methds:["GET", "POST"]
    }
})

new SocketControlle(io)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("public"))

app.use('/',router)

server.listen(8080,()=>{console.log('port 8080')})