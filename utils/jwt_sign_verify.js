const jwt=require("jsonwebtoken");
const {JWTpassword}=require("../config/config");

async function signJWT(user_info){
    return jwt.sign(user_info,JWTpassword);
}

async function verify_JWT(user_jwt){
    try{
        const response=jwt.verify(user_jwt,JWTpassword)
        return response;
    }
    catch(e){
        return false;
    }
}


module.exports={signJWT,verify_JWT};