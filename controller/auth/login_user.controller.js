const loginValidate=require("../../zod_validations/login_validate");
const userModel=require("../../models/user_model");
const {compareWithHashedPassword}=require("../../utils/hashComparePassword");
const {signJWT}=require("../../utils/jwtsignverify");

async function loginUser(req,res){
    // zod validation
    const result=loginValidate.safeParse(req.body);
    if(!(result.success))    return res.status(401).json({msg:"invalid data"});

    // get username,password from DB for check it correct user?
    const user=await userModel.findOne({username:req.body.username});
    if(!user)    return res.status(401).json({msg:"invalid username ..."});

    // check password correct or not ?
    const hash_result=await compareWithHashedPassword(req.body.password,user.password);
    if(!(hash_result))    return res.status(401).json({msg:"invalid password ..."});

    // genrate jwt & give to user
    const user_jwt=await signJWT({name:user.name,username:user.username});
    res.json({Authorization:user_jwt});
}

module.exports=loginUser;