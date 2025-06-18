const loginValidate=require("../../zod_validations/login_validate");
const user_model=require("../../models/user_model");
const {compareWithHashed_password}=require("../../utils/hash_compare_password");
const {signJWT}=require("../../utils/jwt_sign_verify");

async function loginUser(req,res){
    // zod validation
    const result=loginValidate.safeParse(req.body);
    if(!(result.success)){
        res.status(401).json({msg:"invalid data"});
        return;
    }

    // get username,password from DB for check it correct user?
    const user=await user_model.findOne({username:req.body.username});
    if(!user){
        res.status(401).json({msg:"invalid username ..."})
        return;
    }

    // check password correct or not ?
    const hash_result=await compareWithHashed_password(req.body.password,user.password);
    if(!(hash_result)){
        res.status(401).json({msg:"invalid password ..."})
        return;
    }

    // genrate jwt & give to user
    const user_jwt=await signJWT({name:user.name,username:user.username});
    res.json({Authorization:user_jwt});
}

module.exports=loginUser;