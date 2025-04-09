const chat_model=require("../../models/chat_model");
const user_model=require("../../models/user_model");

async function getAllChat(req,res){
    const user=await user_model.findOne({username:req.username});
    if(!user){
        res.status(401).json({msg:"Unautherized access....."});
        return;
    }
    const allChat=await chat_model.find({users:{$in:[user._id]}});
    res.json(allChat);
}

module.exports=getAllChat;