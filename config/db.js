const mongoose=require("mongoose");
const {DB}=require("./config");

// anyone who import db.js call connectDB() function to connect with DB.
const connectDB=async ()=>{
    try{
        await mongoose.connect(DB);
        console.log("MongoDB connected succesfully.....")
    }
    catch(e){
        console.log("MongoDB connection error ❌ ");
        process.exit(1); // stop server bcz DB not connected.
    }
}

module.exports=connectDB;