# OmeLive - A p2p based Omegle Clone

## Overview
[LIVE LINK](https://omelive.vercel.app)

OMELIVE is a real-time, peer-to-peer video chat application inspired by Omegle. It allows users to anonymously connect with each other via video chat sessions.
It uses WebRTC P2P methods; only the signaling server is used, not an SFU (Selective Forwarding Unit).
## Features

- **Real-Time Video Calling**: High-quality, video and audio communication. 
- **Peer-to-Peer Connection**: Direct communication using WebRTC for low-latency, secure video chats.
- **Anonymous Matching**: Random pairing of users for spontaneous video conversations.
- **Real-Time Chatbox**: Users can chat also during video meets.
- **Anonymity**: Server doesnt persist any storage of your chats or history

## Technologies Used

- **WebRTC** : WebRTC: Enables peer-to-peer video and audio exchange for real-time video calling.
- **Socket.IO**: For transferring messages and SDP offers
- **Next.js**: React framework for building server-side rendered applications.

### Installation
```bash
   git clone https://github.com/ayushkumarTomar/OmeLive-omegleClone.git
   cd OmeLive-omegleClone
```

``` bash
# Start the frontend
cd app
npm install
npm run dev
```
```bash
# Start the server
cd ../server
npm install
npm run dev
```

Pull requests are welcome.



<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/a26f4c50-09bb-4155-89d9-f38f831c7974" alt="Screenshot 14" style="width: 48%;">
    <img src="https://github.com/user-attachments/assets/f407e295-0af3-438d-9b53-2e716f0a771b" alt="Screenshot 12" style="width: 48%;">
</div>


