const mongoose=require("mongoose");

const request_schema=new mongoose.Schema({
    sender_id:{type:mongoose.Schema.Types.ObjectId,ref:'user_model',required:true},
    reciever_id:{type:mongoose.Schema.Types.ObjectId,ref:'use_model',required:true},  // if request to user else null
    sender_name:{type:String,required:true},
    reciever_name:{type:String,required:true},
    chat_id:{type:mongoose.Schema.Types.ObjectId,ref:'chat_model'},   // if group join request else null
    status:{type:String,enum:["pending","rejected","accepted"],default:"pending"},  // "pending" or "rejected" or "accepted"
    chatType:{type:String,enums:["1-to-1","group"],required:true}  // "1-to-1" or "group"
},{timestamps:true});


module.exports=mongoose.model("request_model",request_schema);

// working should be (by chatgpt)
// 1-to-1 Request:
// 	•	User1 → sends request to User2.
// 	•	When User2 is online, they can accept/reject the request.

// Group Request:
// 	•	User1 → sends request to chatId (group).
// 	•	Only users in the admins list of that group can accept/reject the request.