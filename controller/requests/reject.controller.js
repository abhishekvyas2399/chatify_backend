const requestModel=require("../../models/request_model");
const userModel=require("../../models/user_model");
// const chat_model=require("../../models/chat_model");
const mongoose = require("mongoose");


const rejectController=async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.requestID))  return res.status(401).json({msg:"invalid request....."});

    const user=await userModel.findOne({username:req.username});
    if(!user)   return res.status(401).json({msg:"invalid user....."});

    const request=await requestModel.findById(req.params.requestID);
    if(!request)    return res.status(401).json({msg:"invalid request....."});

    // if request already responded
    if(request.status=="accepted" || request.status=="rejected")    return res.status(401).json({msg:"invalid request....."});
    // check that request belong to jwt owner?
    if(!(user._id.equals(request.recieverId)))  return res.status(401).json({msg:"invalid request....."});

    // update to reject
    try{
        await requestModel.findByIdAndUpdate(request._id,{$set:{status:"rejected"}},{new:true});
        return res.json({msg:"request rejected..."});
    }catch(e){
        return res.status(500).json({msg:"server error..."});
    }
}

module.exports=rejectController;