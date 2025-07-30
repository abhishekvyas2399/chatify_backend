const requestModel=require("../../models/request_model");
const userModel=require("../../models/user_model");
const chatModel=require("../../models/chat_model");
const mongoose = require("mongoose");


const acceptController=async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.requestID))  return res.status(401).json({msg:"invalid request....."});

    const user=await userModel.findOne({username:req.username});
    if(!user)   return res.status(401).json({msg:"invalid user....."});

    const request=await requestModel.findById(req.params.requestID);
    if(!request)    return res.status(401).json({msg:"invalid request....."});

    // if request already responded
    if(request.status=="accepted" || request.status=="rejected")    return res.status(401).json({msg:"invalid request....."});
    // check that request belong to jwt owner?
    if(!(user._id.equals(request.recieverId)))  return res.status(401).json({msg:"invalid request....."});

    // update to accept & create new chat
    try{
        const session=await mongoose.startSession();
        let chat;
        await session.withTransaction(async ()=>{
            await requestModel.findByIdAndUpdate(request._id,{$set:{status:"accepted"}},{new:true,session}); // use session
            chat=await chatModel.create([{
                users:[request.senderId,request.recieverId],
                usernames:[request.senderName,request.recieverName],
            }],{session});  // use array format with session bcz it Ensures atomicity using MongoDB’s internal bulk write mechanics by send multiple row in array to create
        })
        session.endSession();
        return res.json({msg:"request accepted",chatId:chat[0]._id}); // send array to create so response also array so use [0]
    }catch(e){
        return res.status(500).json({msg:"server error..."});
    }
}
// 🔹 Standalone MongoDB (No Replica Set):
// 	•	❌ No oplog (oplog=opeeration logs)
// 	•	❌ No support for multi-document transactions
// 	•	✔️ Only single-document operations are atomic
// 	•	✅ Lightweight, fast for basic use
// 🔹 Replica Set (Even 1 Node):
// 	•	✅ oplog is created (local.oplog.rs)
// 	•	✅ Supports multi-document transactions
// 	•	✅ Enables replication, rollback, and failover safety
// 	•	🔐 Transactions use oplog to ensure atomicity + durability
// 🧠 Why It’s Designed This Way:
// MongoDB avoids oplog in standalone to reduce overhead.
// But transactions need oplog, so you must use a replica set — even if it’s just one node.


module.exports=acceptController;