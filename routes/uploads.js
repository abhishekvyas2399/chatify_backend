const {Router, response}=require("express");
const jwtAuthentication = require("../middleware/jwtAuthentication");
const { getUploadPresignedUrl_s3, getDownloadPresignedUrl_s3 } = require("../config/s3SignedUrl");
const router=Router();

router.post("/avatar",(req,res)=>{ // upload user profile
    res.json({msg:"this API coming soon....."});
});
router.post("/uploadSignedUrl",jwtAuthentication,async (req,res)=>{
    const username=req.username;
    const fileType=req.body.fileType;
    if(!fileType)   return res.json({msg:"wrong file type..."});
    try{
        const response=await getUploadPresignedUrl_s3(username,fileType);
        if(!response)    return res.json({msg:"wrong file type..."});
        return res.json(response);
    }catch(err){
        return res.json({msg:"error... (check data)"});
    }
});
router.post("/downloadSignedUrl",jwtAuthentication,async (req,res)=>{
    const filePath=req.body.filePath;
    if(!filePath)   return res.json({msg:"invalid data..."});
    // first check do this user have access of that file then only let him access signed url otherwise anyone can access the file. XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    try{
        const response=await getDownloadPresignedUrl_s3(filePath);
        if(!response)   return res.json({msg:"invalid data..."});
        return res.json({signedUrl:response});
    }catch(err){
        return res.json({msg:"error... (check data)"});
    }
});

module.exports=router;