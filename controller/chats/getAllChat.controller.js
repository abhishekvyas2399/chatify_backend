const chatModel=require("../../models/chat_model");
const userModel=require("../../models/user_model");

async function getAllChat(req,res){
    const user=await userModel.findOne({username:req.username});
    if(!user)   return res.status(401).json({msg:"Unautherized access....."});
    const allChat=await chatModel.find({users:{$in:[user._id]}});
    res.json({allChat});
}

module.exports=getAllChat;