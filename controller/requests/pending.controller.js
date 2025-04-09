const request_model=require("../../models/request_model");
const user_model=require("../../models/user_model");

const pendingController=async (req,res)=>{
    const user=await user_model.findOne({username:req.username});
    if(!user){
        res.status(401).json({msg:"invalid user....."});
        return;
    }

    const Allrequests=await request_model.find({reciever_id:user._id,status: "pending"});
    res.json({msg:Allrequests});
}

module.exports=pendingController;