const user_model=require("../../models/user_model")

async function my_profile(req,res){
    const response=await user_model.findOne({username:req.username});
    
    if(!response){
        res.status(401).json({msg:"Unautherized access....."});
        return;
    }

    res.json({
        id:response._id,
        name: response.name,
        username: response.username,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    });
}

module.exports=my_profile;