// websocket logic
module.exports=(io)=>{
    io.on("connection",(socket)=>{
        console.log(`${socket.id} user connected`);
    
        socket.on("joinRoom",(chatId)=>{
            console.log(chatId," room joined");
            socket.join(chatId);
        });
        socket.on("chat Message",(msg)=>{
            const chatId=msg.chatId;
            io.to(chatId).emit("chat Message",msg);  // broadcast to all user in chat Message
        });
        socket.on("read recipt",(data)=>{
            socket.to(data.chatId).emit("read recipt",data);
        });

        socket.on("typing",({chatId,userId})=>{
            socket.to(chatId).emit("typing",{chatId,userId});
        });
        socket.on("stopTyping",({chatId,userId})=>{
            socket.to(chatId).emit("typing",{chatId,userId});  // broadcast to all user except sender
        });
        socket.on("userStatus",({userId})=>{
            io.emit("userStatus",{userId,status:"online"}); // broadcast to all user even sender
        });
        socket.on("disconnect",(socket)=>{
            io.emit("userStatus",{userId:socket.id,status:"offline"}); // status offline when disconnect
        });


        // video call request/answer
        socket.on("videoCall",(chatId)=>{
            const room=io.sockets.adapter.rooms.get(chatId);
            if(!room || room.size==1)    io.to(chatId).emit("videoCallAnswer",{call:false,offline:true});
            else    socket.to(chatId).emit("videoCall",chatId);
        });
        socket.on("videoCallAnswer",({chatId,call})=>{
            socket.to(chatId).emit("videoCallAnswer",{call,offline:false});
        });
        socket.on("endVideoCall",(chatId)=>{
            socket.to(chatId).emit("endVideoCall",chatId);
        });

        // video call webRTC connection establishment socket event
        socket.on("offer",({roomId,offer})=>{
            socket.to(roomId).emit("offer",{roomId,offer});
            console.log("get an offer");
        });
        socket.on("answer",({roomId,answer})=>{
            socket.to(roomId).emit("answer",answer);
            console.log("get answer");
        });
        socket.on("ice-candidate",({roomId,iceCandidate})=>{
            socket.to(roomId).emit("ice-candidate",iceCandidate);
            console.log("get ice candidates");
        });
    });
}