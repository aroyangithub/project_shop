const { Op } = require("sequelize");
const { Chat } = require("../model/chat");

class SocketControlle {
  constructor(io) {
    this.io = io;
    this.io.on("connection", (socket) => {
      this.socket = socket;
      // console.log('this socket',this.socket)
      this.socket.on("socket fun 1", (x)=>{
         this.joined(x)
         
      });
      this.socket.on("getMessagesById", (data)=>{
         this.getMessages(data)
      })

      this.socket.on("addNewMess", (data)=>{
         this.addNewMess(data)
      })
    });
  }

  joined(x) {
    console.log("good", x);
    this.socket.join(x.id)
  }

  async getMessages(data){
     console.log(data)
     await Chat.findAll({
        where:{
           [Op.or]:[
              {from_id:data.id, to_id:data.fId},
              {to_id:data.id, from_id:data.fId},
           ]
        }
     }).then(res=>{
        console.log("res", res)
        this.socket.broadcast.emit('getMess', res)
     }).catch(e=>console.log(e))
  }
  async addNewMess(data){
     await Chat.create({from_id:data.id, to_id:data.fId, text:data.text})
     this.getMessages(data)
  }
}

module.exports = SocketControlle;
