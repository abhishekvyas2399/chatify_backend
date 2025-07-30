// const mongoose= require("mongoose");

const userModel=require("../../models/user_model");
const requestModel=require("../../models/request_model");


const sendController=async (req,res)=>{
    if(!(req.body.requestTo))   res.status(404).json({msg:"blank data....."});
    const requestBy=await userModel.findOne({username:req.username});
    if(!requestBy)    return res.status(401).json({msg:"unauthrized user....."});

    if(req.username===req.body.requestTo)  return res.status(401).json({msg:"cant send request to yourself....."});

    const requestTo=await userModel.findOne({username:req.body.requestTo});
    if(!requestTo)    return res.status(401).json({msg:"invalid username....."});

    // if request already send so check ?
    const exist=await requestModel.findOne({senderId:requestBy._id,recieverId:requestTo._id});
    if(exist){
        if(exist.status==="accepted")   return res.json({msg:"he is already your friend !!!"});
        else if(exist.status==="rejected")    return res.json({msg:"Our strict policy:- already rejected by him so cant send him request !!!"});
        else    return res.json({msg:"request already send !!!"});
    }

    const exist_his_req=await requestModel.findOne({senderId:requestTo._id,recieverId:requestBy._id});
    if(exist_his_req){
        if(exist_his_req.status==="accepted")   return res.json({msg:"he is already your friend..."});
        else if(exist_his_req.status==="pending")  return res.json({msg:"you already have his request accept it..."});
    }

    // put request in request table with sender_id,receiever_id
    try{
        await requestModel.create({ senderId:requestBy._id, recieverId:requestTo._id, senderName:requestBy.username, recieverName:requestTo.username });
        return res.json({msg:"request send to user..."});
    }catch(e){
        return res.status(500).json({msg:"server error"});
    }
}

module.exports=sendController;