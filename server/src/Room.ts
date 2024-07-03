
import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import Queue from "./Queue";
import { Server } from 'socket.io';


/*
const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" }
];

*/

let NUM_OF_PLAYERS = 0
interface User {
    id: string;
}

interface Room {
    user1: User;
    user2: User;
}

export {NUM_OF_PLAYERS}

const queue = new Queue<User>()

export class RoomManager {
    private rooms: Map<string, Room>;
    private io:Server

    constructor(io:Server) {
        this.rooms = new Map<string, Room>();
        this.io = io;
    }

    createRoom(user1: User , user2: User){
        const roomId = uuidv4()
        this.rooms.set(roomId , {user1 ,user2})
        return roomId
    }


    async addUser(socketId:string){
        await new Promise(resolve => setTimeout(resolve, 3000));

        NUM_OF_PLAYERS++;
        console.log("Number of players ---> "  , socketId ," => " , NUM_OF_PLAYERS)
        queue.enqueue({id:socketId})
        console.log("PLAYERS IN QUEUE -> " , queue.size())
        if(queue.size()>1){
            console.log(":: Pair found ::")
            const user1 = queue.dequeue()
            const user2 = queue.dequeue()
            if(user1 && user2) {
                console.log("requesting offer")
                const room = this.createRoom(user1 , user2)
                this.io.to(user1.id).to(user2.id).emit('joined' , {room})
                this.io.to(user1.id).emit("send-offer")
                console.log("sent offer request to :: " , user1.id)
            }
        }
        else {
            console.log("NO PAIR FOUND")
        }

        this.io.emit("user-count" , NUM_OF_PLAYERS)
    }

    handleOffer(socketId:string , roomId:string, offer:any){
        console.log("OFFER SENT BY :: " , socketId , " FOR ROOM ::  " , roomId)

        const room = this.rooms.get(roomId)
        if(!room) return
        const reciever = room?.user1.id===socketId ? room.user2.id : room?.user1.id
        console.log("SENDING OFFER TO  :: " , reciever)
        
        this.io.to(reciever).emit("offer" , offer)

    }
    
    handleAnswer(socketId:string , roomId:string, offer:any){

        const room = this.rooms.get(roomId)
        if(!room) return
        const reciever = room?.user1.id===socketId ? room.user2.id : room?.user1.id
        console.log("RECIEVED ANSWER SENDING TO :: " , reciever)

        
        this.io.to(reciever).emit("answer" , offer)

    }

    handleIceCandidates(socketId:string , roomId:string , iceCandidates:any){
        const room = this.rooms.get(roomId)
        if(!room) return

        const reciever = room?.user1.id===socketId ? room.user2.id : room?.user1.id
        this.io.to(reciever).emit("ice-candidates" , iceCandidates)
    }

    

    handleDisconnect(socketId:string){
        console.log("DISCONNECTED :: " , socketId)
        const itemToRemove = queue.find(socketId);
        NUM_OF_PLAYERS--;
        queue.printQueue()
        if (itemToRemove) {
            queue.remove(itemToRemove);
            console.log(`Removed item with id ${socketId}.`);
        }
        queue.printQueue()
        this.rooms.forEach((room , roomId)=>{
            console.log("ROOM ::  " , roomId , "USER1 :: ", room.user1.id , "  USER2 :: " , room.user2.id)
            if(room.user1.id==socketId || room.user2.id == socketId){
                this.rooms.delete(roomId)
                console.log("DELETING ROOM :: " , roomId)
                this.io.to(room.user1.id).to(room?.user2.id).emit("leaveRoom")
            }
        })
        this.io.emit("user-count" , NUM_OF_PLAYERS)
    }

    handleLeaveRoom(socketId:string){
        console.log("LEAVING REQUEST FROM :: " , socketId)
        this.rooms.forEach((room , roomId)=>{
            console.log("ROOM ::  " , roomId , "USER1 :: ", room.user1.id , "  USER2 :: " , room.user2.id)
            if(room.user1.id==socketId || room.user2.id == socketId){
                this.rooms.delete(roomId)
                console.log("DELETING ROOM :: " , roomId)
                
                this.io.to(room.user1.id).to(room?.user2.id).emit("leaveRoom")
            }
        })
    }

    handleMessage(roomId:string , socketId:string ,message:string){
        console.log("MESSAGE RECIEVED IN ::  " , roomId)
        const room = this.rooms.get(roomId)
        if(!room) return

        const reciever = room?.user1.id===socketId ? room.user2.id : room?.user1.id
        this.io.to(reciever).emit("message" , message)
    }
    
   
  
}


