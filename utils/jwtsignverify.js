const jwt=require("jsonwebtoken");
const {JWTpassword}=require("../config/config");

async function signJWT(userInfo){
    return "Bearer "+jwt.sign({userInfo},JWTpassword,{ expiresIn: "1h" });
}

async function verifyJWT(userJwt){
    try{
        const response=jwt.verify(userJwt,JWTpassword)
        return response;
    }
    catch(e){
        return false;
    }
}


module.exports={signJWT,verifyJWT};