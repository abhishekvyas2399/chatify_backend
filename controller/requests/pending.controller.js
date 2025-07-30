const requestModel=require("../../models/request_model");
const userModel=require("../../models/user_model");

const pendingController=async (req,res)=>{
    const user=await userModel.findOne({username:req.username});
    if(!user)   return res.status(401).json({msg:"invalid user....."});

    const allRequests=await requestModel.find({recieverId:user._id,status: "pending"});
    res.json({allRequests});
}

module.exports=pendingController;