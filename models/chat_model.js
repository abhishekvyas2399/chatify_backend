// ✅ “Store group members in an array instead of a separate table for users–group relation, because:
// 	1.	Fast reads – All members are in the array, no joins like SQL.
// 	2.	User join/leave rarely – So even if array update is slower, it’s okay.
// 	3.	Data is denormalized – Works well with NoSQL (MongoDB), gives super fast access.”
//  4.	User limit in group – Since MongoDB document limit is 16MB, it’s fine as we limit group size (e.g., 512 members like WhatsApp).”

const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],  //  2 users in chat
    usernames:[{type:String}],  // 2 users in chat
    lastMessage:{type:String}, // this 3 are for show recent chats & previews in chat list, without querying the messages collection each time
    fileType:{type:String},
    updatedAt:{type:Date},
},{timestamps:true});

module.exports=mongoose.model("chat",chatSchema);