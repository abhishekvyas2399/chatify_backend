const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},  // hashed
    profilePic:{type:String,default:""},
},{timestamps:true});
// timestamps:true automatically adds two fields to each document:
// 	1.	createdAt → Stores the date and time when the document was created.
// 	2.	updatedAt → Updates automatically whenever the document is modified.
// Benefit: No need to manually handle timestamps, useful for tracking record history.

module.exports=mongoose.model('user_model',userschema);