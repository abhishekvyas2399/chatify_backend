const mongoose=require("mongoose");
const userModel=require("../../models/user_model");
const chatModel=require("../../models/chat_model");
const messageModel = require("../../models/message_model");

const markMsgReaded=async (req,res)=>{
    const chatId=req.params.chatId;
    if(!chatId)    return res.json("invalid data.....");

    if(!mongoose.Types.ObjectId.isValid(chatId))    return res.json("invalid data.....");

    const user=await userModel.findOne({username:req.username});
    if(!user)    return res.status(401).json("Unauthorized Access.....");

    const chat=await chatModel.findById(chatId);
    if(!chat)    return res.status(404).json("no such chat exist.....");

    if( !(chat.users[0].equals(user._id)) && !(chat.users[1].equals(user._id)) )
    return res.status(401).json("you are not in that chat.....");

    try{
        await messageModel.updateMany({chatId,senderId:{$ne:user._id},isRead:{$ne:"read"}},{$set:{isRead:"read"}});
        res.json({msg:"mark readed"});
    }catch(e){
        res.status(500).json({msg:"server Error"});
    }
}

module.exports=markMsgReaded;