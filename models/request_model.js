const mongoose=require("mongoose");

const requestSchema=new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    senderName:{type:String,required:true},
    recieverId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    recieverName:{type:String,required:true},
    chatId:{type:mongoose.Schema.Types.ObjectId,ref:'chat'},   // if group join request else null
    status:{type:String,enum:["pending","rejected","accepted"],default:"pending"},  // "pending" or "rejected" or "accepted"
    // chatType:{type:String,enums:["1-to-1","group"],required:true}  // "1-to-1" or "group"
},{timestamps:true});


module.exports=mongoose.model("request",requestSchema);

// working should be (by chatgpt)
// 1-to-1 Request:
// 	•	User1 → sends request to User2.
// 	•	When User2 is online, they can accept/reject the request.

// Group Request:
// 	•	User1 → sends request to chatId (group).
// 	•	Only users in the admins list of that group can accept/reject the request.