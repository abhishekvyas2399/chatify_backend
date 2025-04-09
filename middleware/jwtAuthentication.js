const {verify_JWT}=require("../utils/jwt_sign_verify");

const jwtAuthentication=async (req,res,next)=>{
    const jwt=req.headers.authorization;
    if(!jwt){
        res.status(401).json({msg:"Unautherized access....."});
        return;
    }

    const response= await verify_JWT(jwt);
    if(!response){
        res.status(401).json({msg:"Unautherized access....."});
        return;
    }

    req.username=response.username;
    next();
}

module.exports=jwtAuthentication;