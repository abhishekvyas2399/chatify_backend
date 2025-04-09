const request_model=require("../../models/request_model");
const user_model=require("../../models/user_model");
const chat_model=require("../../models/chat_model");
const mongoose = require("mongoose");


const rejectController=async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.requestID)){
        res.status(401).json({msg:"invalid request....."});
        return;
    }

    const user=await user_model.findOne({username:req.username});
    if(!user){
        res.status(401).json({msg:"invalid user....."});
        return;
    }

    const request=await request_model.findById(req.params.requestID);
    if(request.status=="accepted" || request.status=="rejected"){  // if request already responded
        res.status(401).json({msg:"invalid request....."});
        return;
    }
    // check that request request belong to jwt owner?
    if(user._id.equals(request.reciever_id)){ // is requet to that user
        // update to reject
        await request_model.findByIdAndUpdate(request._id,{$set:{status:"rejected"}},{new:true});
        res.json({msg:"request rejected"});
        return;
    }
    // is request to this jwt owner group & he is admin
    // if(mongoose.Types.ObjectId.isValid(request.chat_id)){
    //     const chat=await chat_model.findById(request.chat_id);
    //     if(chat && chat.admins.includes(user._id)){
    //         // update to accept & add him in group participants
    //     }
    // }

    res.json({msg:"no such request"});
}

module.exports=rejectController;