const mongoose= require("mongoose");
const userModel=require("../../models/user_model")
const messageModel=require("../../models/message_model");
const chatModel = require("../../models/chat_model");

const {getDownloadPresignedUrl_s3}=require("../../config/s3SignedUrl");

async function getOldReadedMessage(req,res){
    const lastMessage=req.query.lastMessage;
    const chatId=req.params.chatId;

    if(!(mongoose.Types.ObjectId.isValid(chatId)))  return res.json("invalid chat.....");

    const user=await userModel.findOne({username:req.username});
    if(!user)   return res.status(401).json({msg:"Unautherized access....."});

    const chat=await chatModel.findById(chatId);
    if(!chat)    return res.status(404).json("no such chat exist.....");

    if( !(chat.users[0].equals(user._id)) && !(chat.users[1].equals(user._id)) )
        return res.status(401).json("you are not in that chat.....");

    try{
        const query=lastMessage && mongoose.Types.ObjectId.isValid(lastMessage)?{chatId,_id:{$lt:lastMessage},isRead:"read"}:{chatId,isRead:"read"};
        const messages=await messageModel.find(query).sort({createdAt:-1}).limit(20).lean();
        // You’re using Mongoose. messages contains Mongoose documents or .lean() results, which not allow adding new fields directly so convert it to object to add signedUrl in it.      (or)      use .lean()
        // .lean() tells Mongoose to return plain JavaScript objects instead of full Mongoose documents.
        //  Without .lean(), Mongoose gives you heavy documents that don’t behave like normal objects.

        // async function in forEach not wait for data and directly assign promise. this assign is after res.json({messages}) run so user not get signed url so use normal for loop there
        for(let i=0;i<messages.length;i++){
            if(!messages[i].filePath)   continue;
            messages[i].fileSignedUrl=await getDownloadPresignedUrl_s3(messages[i].filePath);
        }
        res.json({messages});
    }catch(e){
        return res.status(500).json({msg:"server error..."});
    }
}

module.exports=getOldReadedMessage;