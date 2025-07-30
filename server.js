// initialize express server & socket server
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");

const connectDB=require("./config/db")
const {PORT}=require("./config/config")

const auth=require("./routes/auth");
const requests=require("./routes/requests");
const users=require("./routes/users");
const chats=require("./routes/chats");
const messages=require("./routes/messages");
const notifications=require("./routes/notifications");
const uploads=require("./routes/uploads");

const sockerHandler=require("./socket");

const app=express();
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*",   // change it to the site you deploy your code on
        methods:['get','post','put','delete']
    },
});

app.use(cors());
app.use(express.json());
app.use("/api/auth",auth);  // login,register,jwtValidation
app.use("/api/requests",requests);  // handle chat requests
app.use("/api/users",users); // user_INFO get,update
app.use("/api/chats",chats); // create , retrieve chat
app.use("/api/messages",messages); //  store & get msg
app.use("/api/notifications",notifications); //  handle notification when a new msg arrive  (byme:-make unread attribute in table in DB)
app.use("/api/uploads",uploads); //  give upload signed url
app.use((err,req,res,next)=>{
    console.log(err.message)
    res.status(500).json({msg:"server error....."});
});


// socketIO
sockerHandler(io);


const connectDB_then_startServer=async ()=>{ // first connectDB then start server so no error like user excess DB when DB not connected
    await connectDB(); // connect to mongoDB
    server.listen(PORT,()=>{console.log(`server running at port ${PORT}`)});
}
connectDB_then_startServer()//