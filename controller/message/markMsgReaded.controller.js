const mongoose=require("mongoose");
const user_model=require("../../models/user_model");
const chat_model=require("../../models/chat_model");
const message_model = require("../../models/message_model");

const markMsgReaded=async (req,res)=>{
    const chat_Id=req.params.chatId;
    if(!chat_Id){
        res.json("invalid data.....");
        return;
    }
    if(!mongoose.Types.ObjectId.isValid(chat_Id)){
        res.json("invalid data.....");
        return;
    }

    const user=await user_model.findOne({username:req.username});
    if(!user){
        res.status(401).json("Unauthorized Access.....");
        return;
    }

    const chat=await chat_model.findById(chat_Id);
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

    
    try{
        await message_model.updateMany({chat_Id,sender_Id:{$ne:user._id},is_Read:false},{$set:{is_Read:true}});
        res.json({msg:"mark readed"});
    }catch(e){
        res.status(500).json({msg:"server Error"});
    }
}

module.exports=markMsgReaded;