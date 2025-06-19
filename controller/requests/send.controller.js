const mongoose= require("mongoose");

const user_model=require("../../models/user_model");
const chat_model=require("../../models/chat_model");
const request_model=require("../../models/request_model");


const sendController=async (req,res)=>{
    const request_by=await user_model.findOne({username:req.username});
    if(!request_by){
        res.status(401).json({msg:"not valid user....."});
        return;
    }

    if(req.username===req.body.request_to){
        res.status(401).json({msg:"cant send request to yourself....."});
        return;
    }

    // findout request is for user or group
    const request_to=await user_model.findOne({username:req.body.request_to});
    if(request_to){
        // if request already send so check ?
        const exist=await request_model.findOne({sender_id:request_by._id,reciever_id:request_to._id});
        if(exist){
            if(exist.status==="accepted")
                res.json({msg:"he is already your friend !!!"});
            else if(exist.status==="rejected")
                res.json({msg:"already rejected by him so cant send him request !!!"});
            else
                res.json({msg:"request already send !!!"});
            return;
        }
        const exist_his_req=await request_model.findOne({sender_id:request_to._id,reciever_id:request_by._id});
        if(exist_his_req){
            if(exist_his_req.status==="accepted")
                res.json({msg:"he is already your friend !!!"});
            else if(exist_his_req.status==="pending")
                res.json({msg:"you already have his request accept it !!!"});
            return;
        }
        // put request in request table with sender_id,receiever_id
        await request_model.create({
            sender_id:request_by._id,
            reciever_id:request_to._id,
            sender_name:request_by.username,
            reciever_name:request_to.username,
            chatType:"1-to-1",
        });
        res.json({msg:"request send to user"});
        return;
    }
    // if(mongoose.Types.ObjectId.isValid(req.body.request_to)){  // findById take only mongoose id otherwise give error & stop server so check it
    //     const request_to_chat=await chat_model.findById(req.body.request_to);
    //     if(request_to_chat){
    //         // if request already send so check ?
    //         const exist=await request_model.findOne({sender_id:request_by._id,chat_id:request_to_chat._id});
    //         if(exist){
    //             res.json({msg:"request send to group"});
    //             return;
    //         }
    //         // put request in request table with sender_id,chat_id
    //         await request_model.create({
    //             sender_id:request_by._id,
    //             chat_id:request_to_chat._id,
    //             chatType:"group",
    //         });
    //         res.json({msg:"request send to group"});
    //         return;
    //     }
    // }

    res.json({msg:"invalid id"});
}

module.exports=sendController;