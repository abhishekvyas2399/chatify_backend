const user_validate=require("../../zod_validations/user_validate");
const user_model=require("../../models/user_model");
const {hashPassword}=require("../../utils/hash_compare_password");

async function registerUser(req,res){
    // zod validation (put it in middleware)
    const result=user_validate.safeParse(req.body);
    if(!(result.success)){
        res.status(400).json({msg:"invalid data"});
        return;
    }

    // not make user if duplicate userName (put it also in middleware)
    const u=await user_model.findOne({username:req.body.username});
    if(u){
        res.status(409).json({msg:"username already used"});
        return;
    }

    const name=req.body.name;
    const username=req.body.username;
    const password=await hashPassword(req.body.password); // hash password
    const profilePic="profileurl_in_future";

    // create user in MongoDB
    await user_model.create({name,username,password,profilePic});
    res.json({msg:"user created"});
}

module.exports=registerUser;