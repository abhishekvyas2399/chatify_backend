const mongoose= require("mongoose");
const userModel=require("../../models/user_model")
const messageModel=require("../../models/message_model");
const chatModel = require("../../models/chat_model");
const { getDownloadPresignedUrl_s3 } = require("../../config/s3SignedUrl");

async function getUnreadedMessage(req,res){
    const chatId=req.params.chatId;
    if(!chatId)    return res.json("invalid data.....");

    if(!(mongoose.Types.ObjectId.isValid(chatId)))  return res.json("invalid chat.....");

    const user=await userModel.findOne({username:req.username});
    if(!user)    return res.status(401).json({msg:"Unautherized access....."});

    const chat=await chatModel.findById(chatId);
    if(!chat)   return res.status(404).json("no such chat exist.....");

    if( !(chat.users[0].equals(user._id)) && !(chat.users[1].equals(user._id)) )
        return res.status(401).json("you are not in that chat.....");

    const session=await mongoose.startSession();
    let messages=[];
    try{
        await session.withTransaction(async ()=>{
            await messageModel.updateMany({chatId,senderId:{$ne:user._id},isRead:"unread"},{$set:{isRead:"delivered"}},{session}); // mark msg delivered
            messages=await messageModel.find({chatId,isRead:{$ne:"read"}},null,{session}).sort({createdAt:1}).lean();  
            // Send null before session because 2nd argument is projection (projection:- document fields to return (msg,sendId,..)).
            //  If skipped, and session is 2nd arg, it’s treated as projection → causes error.
            //  But when we don’t use session/transaction, we pass only 1 argument — in that case, projection defaults to return all fields.

            // You’re using Mongoose so messages contains Mongoose documents results, which not allow adding new fields directly so convert it to object to add signedUrl in it.      (or)      use .lean()
            // .lean() tells Mongoose to return plain JavaScript objects instead of full Mongoose documents.
            //  Without .lean(), Mongoose gives you heavy documents that don’t behave like normal objects.
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({msg:"server error..."});
    }finally{
        await session.endSession();   // In JavaScript, when you use try...catch...finally, the finally block always runs, even after a return inside try or catch. bcz the finally block executes before the function fully exits.
    }


    // async function in forEach not wait for data and directly assign promise. this assign is after res.json({messages}) run so user not get signed url so use normal for loop there
    for(let i=0;i<messages.length;i++){
        if(!messages[i].filePath)   continue;
        messages[i].fileSignedUrl=await getDownloadPresignedUrl_s3(messages[i].filePath);
    }
    return res.json({messages});
}

module.exports=getUnreadedMessage;