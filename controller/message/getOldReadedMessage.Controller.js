const mongoose= require("mongoose");
const user_model=require("../../models/user_model")
const message_model=require("../../models/message_model");
const chat_model = require("../../models/chat_model");

async function getOldReadedMessage(req,res){
    const lastMessage=req.query.lastMessage;
    const chatId=req.params.chatId;

    if(!(mongoose.Types.ObjectId.isValid(chatId))){
        res.json("invalid chat.....");
        return;
    }

    const user=await user_model.findOne({username:req.username});
    if(!user){
        res.status(401).json({msg:"Unautherized access....."});
        return;
    }

    const chat=await chat_model.findById(chatId);
    if(!chat){
        res.status(404).json("no such chat exist.....");
        return;
    }

    let heExistinChat=false;
    const chatLength=chat.users.length;
    for(let i=0;i<chatLength;i++){
        if(chat.users[i].equals(user._id)){
            heExistinChat=true;
            break;
        }       
    }
    if(!heExistinChat){
        res.status(401).json("you are not in that chat.....");
        return;
    }

    const query=lastMessage && mongoose.Types.ObjectId.isValid(lastMessage)?{chat_Id:chatId,_id:{$lt:lastMessage},is_Read:true}:{chat_Id:chatId,is_Read:true};
    const messages=await message_model.find(query).sort({createdAt:-1}).limit(20);
    res.json({messages});
}

module.exports=getOldReadedMessage;