const mongoose=require("mongoose");

const chatSchema=new mongoose.Schema({
    isGroup:{type:Boolean,default:false},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"user_model"}],  // users in chat
    username:[{type:String}],  // users in chat
    admins:[{type:mongoose.Schema.Types.ObjectId,ref:"user_model"}],  // admins in chat
    chatName:{type:String},  // for group
},{timestamps:true});

module.exports=mongoose.model("chat_model",chatSchema);
