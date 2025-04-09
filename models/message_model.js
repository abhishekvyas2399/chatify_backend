const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    chat_Id:{type:mongoose.Schema.Types.ObjectId,ref:'chat_model',required:true},
    sender_Id:{type:mongoose.Schema.Types.ObjectId,ref:'user_model',required:true},
    sender_name:{type:String,required:true},
    message:{type:String,required:true},
    is_Read: { type: Boolean, default: false },
},{timestamps:true});

module.exports=mongoose.model('message_model',messageSchema);