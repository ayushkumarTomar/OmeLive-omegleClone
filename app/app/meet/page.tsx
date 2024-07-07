"use client"
import React, { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import AppBar from '../components/appBar'
import localFont from "next/font/local";
const headingFont = localFont({
  src: "../../public/fonts/CalSans-SemiBold.woff2"
});
let socket:Socket;
let roomId: string;
interface Message {
  from: 'host' | 'remote';
  message: string;
}
const Page = () => {
  const [messageText , setMessageText] = useState<string>("")
  const [userCount , setUserCount] = useState<string>("🔃")
  const [messages, setMessages] = useState<Message[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  const [reConnect, setReConnect] = useState<boolean>(false)


  const handleSend = ()=>{
    if(!roomId) return
    socket.emit("message" , roomId , messageText)
    setMessages(prev=>[{from:"host" , message:messageText} , ...prev])
    setMessageText("")
  }
  const handleSkip = ()=>{
    socket.emit("leaveRoom")
  }
  useEffect(() => {
    //@ts-ignore
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)

    const peerConnection = new RTCPeerConnection(configuration);
    console.log("connection started .... sending join message")

    socket.emit("join")

    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: "user" }, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        stream?.getTracks().forEach(track => {
          peerConnection.addTrack(track, stream);
        });
        console.log("ADDED LOCAL TRACKS TO PC")
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    const createOffer = async () => {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("CREATED OFFER SENDING TO :: ", roomId)
      socket.emit("offer", roomId, offer)
    }
   
  

    const sendAnswer = async () => {
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit("answer", roomId, answer);
    }

    getUserMedia()

    const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate){
        const iceCandidate = event.candidate
        console.log("SENDING ICE CANDIDATES")
        socket.emit("ice-candidates", roomId, iceCandidate
          
        )}
    }

    const handleTrack = (event: RTCTrackEvent) => {
      console.log("HANDLE TRACK LISTENER")
      const newMediaStream = new MediaStream()
      event.streams[0].getTracks().forEach(track => {
        newMediaStream.addTrack(track)
      })
      setRemoteStream(newMediaStream)
      console.log("SETTING REMOTE STREAM :: " , newMediaStream)
      if (remoteVideoRef.current)
        remoteVideoRef.current.srcObject = newMediaStream;
        console.log("SET THE remotevideo REF")
    }

    const handleNegotiation = async(e:Event)=>{
      try {
        if(!roomId) return
        console.log("NEGOTIATION NEEDED: Creating offer")
        await createOffer();
      } catch (error) {
        console.error("Error during negotiation:", error);
      }
    }

    socket.on("joined", ({ room }: { room: string }) => {
      roomId = room
      console.log("JOINED ROOM :: ", room)
      console.log("MY SOCKET ID :: ", socket.id)
    })

    socket.on("leaveRoom", () => {
      setMessages([])
      console.log("ROOM LEAVING REQUEST RECEIVED")
      setRemoteStream(null)
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null
      roomId = ""

      remoteStream?.getTracks().forEach(track => track.stop());
      localStream?.getTracks().forEach(track => track.stop());
      setRemoteStream(null);
      setLocalStream(null)
      console.log("Room Id after leave :: " , roomId)
      setReConnect(prev=>!prev)
      

    })

    socket.on("answer", (offer: RTCSessionDescriptionInit) => {
      console.log("ANSWER RECIEVED")
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    })

    socket.on("send-offer", () => {
      console.log("OFFER REQUEST RECIEVED")
      createOffer()
    })

    socket.on('offer', (offer: RTCSessionDescriptionInit) => {
      console.log("OFFER RECEIVED SENDING ANSWER ")
      peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      sendAnswer()
    })

    socket.on("ice-candidates", (iceCandidate: RTCIceCandidate) => {
      console.log("RECEIVED ICE CANDIDATES")
      peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate));
    })

    socket.on("message" , (msg:string)=>{
      setMessages(prev=>[{from:"remote" , message:msg} , ...prev])

    })

    socket.on('user-count' , (count:string)=>{
      setUserCount(count)
    })

    peerConnection.addEventListener('icecandidate', handleIceCandidate)
    console.log("ICE CANDIDATE EVENT LISTNER STARTED")
    peerConnection.addEventListener('track', handleTrack);
    peerConnection.addEventListener('negotiationneeded' , handleNegotiation);

    return () => {
      socket.removeAllListeners()
      console.log("CLEANUP ALL LISTENERS")
      socket.disconnect()

      
      peerConnection.removeEventListener('icecandidate', handleIceCandidate)
      peerConnection.removeEventListener('track', handleTrack)
      peerConnection.close()
      console.log("CLOSED PEER CONNECTION ")

    }
  }, [reConnect]);


    return (
      <div className='bg-zinc-900 h-screen overflow-hidden'>
      <AppBar online={userCount}/>
      <div className='mt-12 ml-20 grid grid-cols-12 bottom-0'>
        <div className='col-span-5 mt-5 h-full flex flex-col ml-20 gap-3'>
          <div className='rounded-3xl h-2/5 bg-slate-700 flex items-center justify-center mb-4'>
            <video id='remoteVideo' ref={remoteVideoRef} className='rounded-3xl' autoPlay />
          </div>
          <div className='rounded-3xl 2/5 bg-slate-700 flex items-center justify-center'>
            <video id='localVideo' ref={localVideoRef} className='rounded-3xl' autoPlay muted />
          </div>
        </div>
        <div className='col-span-6 p-7 ml-20 ' style={{height:"95%"}}>
          <div className='bg-zinc-800 h-full w-full rounded-3xl p-5'>
            <div className='bg-zinc-800' style={{ height: '90%' }}>
              <div className='flex flex-col-reverse h-full overflow-y-auto' style={{maxHeight:585}} >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex my-1 ${msg.from === 'host' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`chat-message p-3 rounded-3xl ${
                        msg.from === 'host' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'
                      }`}
                    >
                      <p className={`${headingFont.className} text-sm`}>{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex items-center mt-4'>
              <div className='bg-green-400 px-6 py-2 rounded-lg cursor-pointer' onClick={handleSkip}>
                <h1 className={`text-white ${headingFont.className}`}>SKIP</h1>
              </div>
              <input
                type='text'
                placeholder='Type your message...'
                className='flex-grow ml-4 py-2 px-4 bg-zinc-700 text-white rounded-lg focus:outline-none'
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button className='ml-4 p-2 bg-blue-500 rounded-lg text-white' onClick={handleSend}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6'
                >
                  <path d='M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )  }

export default Page
