const {Router}=require("express");
const jwtAuthentication = require("../middleware/jwtAuthentication");
const userModel=require("../models/user_model");
const mongoose= require("mongoose");
const { getDownloadPresignedUrl_s3 } = require("../config/s3SignedUrl");
const router=Router();

router.get("/",(req,res)=>{ // get all user for a chat/groupchat
    res.json({msg:"this API coming soon....."});
});
router.get("/:id",(req,res)=>{ // get user details by id
    res.json({msg:"this API coming soon....."});
});
router.put("/:id",jwtAuthentication,async (req,res)=>{ // update user profile
    const id=req.params.id;
    const username=req.username; // we dont want username change bcz it can cause inconsistency in data bcz it used in many places
    const name=req.body.name;
    const profilePic=req.body.profilePic;

    if(!(id.trim()) || !(username.trim()) || !(name.trim()) || !(profilePic.trim()))    return res.status(400).json("Invalid data");
    if(!(mongoose.Types.ObjectId.isValid(id)))  return res.status(400).json("invalid id.....");

    try{
        const response=await userModel.findByIdAndUpdate(id,{username:username,name:name,profilePic:profilePic},{new:true});
        if(!response)    return res.status(400).json({msg:"invalid data"});
        const {password,...userWithRequiredDataOnly}=response.toObject();
        const profileSignedUrl=await getDownloadPresignedUrl_s3(profilePic);
        return res.json({profileSignedUrl,...userWithRequiredDataOnly});
    }catch(err){
        console.log(err.message);
        if(err.code===11000)    return res.status(401).json({msg:"access to unauthorized data"})
        return res.status(500).json({msg:"server error..."});
    }
});
router.delete("/:id",(req,res)=>{ // delete user
    res.json({msg:"this API coming soon....."});
});

module.exports=router;