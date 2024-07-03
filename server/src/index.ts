import { Socket } from "socket.io";
import http from "http";
import express from 'express';
import { Server } from 'socket.io';
import { RoomManager } from "./Room";
import { NUM_OF_PLAYERS } from "./Room";
const app = express();
const server = http.createServer(http);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.get("/" , (req , res)=>{
  return res.json({status: "Server working"})
})
const manager = new RoomManager(io)

io.on('connection', (socket: Socket) => {
  console.log("user connected :: " , socket.id)
  socket.on("join" , ()=>{
    console.log("user joined :: " , socket.id)
    manager.addUser(socket.id)
  })
  socket.on("disconnect", () => {
    console.log("user disconnected :: " , socket.id) 
    manager.handleDisconnect(socket.id)
  }
  )
  socket.on("message" , (roomId:string ,message:string)=>{
    manager.handleMessage(roomId,socket.id , message)
  })
  socket.on("offer" , (roomId:string , offer:any)=>{
    console.log("offer -> ")
    manager.handleOffer(socket.id ,roomId , offer)
  })

  socket.on("answer" , (roomId:string , offer:any)=>{
    console.log("answer -> ")

    manager.handleAnswer(socket.id , roomId , offer)
  })
  socket.on("ice-candidates" , (roomId:string , iceCandidates:any)=>{
    console.log("iceCandidates -> " )

    manager.handleIceCandidates(socket.id , roomId , iceCandidates)
  })

  socket.on("leaveRoom" , (roomId:string)=>{
    console.log("LEAVE ROOM REQUEST FROM " , socket.id)
    manager.handleLeaveRoom(socket.id)
  })
});

server.listen(8000, () => {
    console.log('listening on *:8000');

});