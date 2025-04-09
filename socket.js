// websocket logic
module.exports=(io)=>{
    io.on("connection",(socket)=>{
        console.log(`${socket.id} user connected`);
    
        socket.on("joinRoom",(chatId)=>{
            console.log(chatId," room joined");
            socket.join(chatId);
        });
        socket.on("chat Message",({chatId,newMessage,senderId,senderName})=>{
            const message = {chatId,text: newMessage,senderId,senderName,timestamp: new Date().toISOString()};  // full details
            io.to(chatId).emit("chat Message",message);  // broadcast to all user in chat Message
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
    });
}