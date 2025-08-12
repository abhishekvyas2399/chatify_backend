const { getDownloadPresignedUrl_s3 } = require("../../config/s3SignedUrl");
const userModel=require("../../models/user_model")

async function my_profile(req,res){
    const response=await userModel.findOne({username:req.username});
    
    if(!response)   return res.status(401).json({msg:"Unautherized access....."});

    const profileSignedUrl=await getDownloadPresignedUrl_s3(response.profilePic);

    res.json({
        id:response._id,
        name: response.name,
        username: response.username,
        profileSignedUrl:profileSignedUrl,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
    });
}

module.exports=my_profile;