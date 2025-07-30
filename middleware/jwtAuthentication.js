const {verifyJWT}=require("../utils/jwtsignverify");

const jwtAuthentication=async (req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer '))
        return res.status(401).json({msg:"Unautherized access....."});

    const jwt=auth.split(' ')[1];
    if(!jwt)    return res.status(401).json({msg:"Unautherized access....."});
    const response= await verifyJWT(jwt);
    if(!response || !response.userInfo || !response.userInfo.username)   return res.status(401).json({msg:"Unautherized access....."});

    req.username=response.userInfo.username;
    next();
}

module.exports=jwtAuthentication;