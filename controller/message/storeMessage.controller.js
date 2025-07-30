const mongoose=require("mongoose");
const userModel=require("../../models/user_model");
const chatModel=require("../../models/chat_model");
const messageModel = require("../../models/message_model");

const StoreMessage=async (req,res)=>{
    const chatId=req.body.chatId;
    const message=req.body.newMessage;
    const filePath=req.body.filePath;
    const fileType=req.body.fileType;
    if(!chatId || (!message && (!filePath || !fileType)) || (message=="" && (!filePath || !fileType)))    return res.status(400).json("invalid data.....1");
    
    if(!mongoose.Types.ObjectId.isValid(chatId))    return res.status(400).json("invalid data.....");

    const user=await userModel.findOne({username:req.username});
    if(!user)    return res.status(401).json("Unauthorized Access.....");

    const chat=await chatModel.findById(chatId);
    if(!chat)    return res.status(404).json("no such chat exist.....");

    if( !(chat.users[0].equals(user._id)) && !(chat.users[1].equals(user._id)) )
    return res.status(401).json("you are not in that chat.....");
    
    const senderId=user._id;
    const senderName=user.username;

    try{
        let query;
        if(message && filePath)  query={chatId,senderId,senderName,message,filePath,fileType};
        else if(message)  query={chatId,senderId,senderName,message};
        else  query={chatId,senderId,senderName,filePath,fileType};
        
        const msg=await messageModel.create(query);
        res.json(msg);
    }catch(e){
        res.status(500).json({msg:"server error"});
    }
}


module.exports=StoreMessage;