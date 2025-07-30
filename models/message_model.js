const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    chatId:{type:mongoose.Schema.Types.ObjectId,ref:'chat',required:true},
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    senderName:{type:String,required:true},
    message:{type:String},
    fileType:{type:String},
    filePath:{type:String},
    isRead: { type: String, default: "unread" },
},{timestamps:true});

module.exports=mongoose.model('message',messageSchema);