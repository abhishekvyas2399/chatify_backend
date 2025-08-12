const userValidate=require("../../zod_validations/user_validate");
const userModel=require("../../models/user_model");
const {hashPassword}=require("../../utils/hashComparePassword");

async function registerUser(req,res){
    // zod validation (put it in middleware)
    const result=userValidate.safeParse(req.body);
    if(!(result.success))    return res.status(400).json({msg:"invalid data"});

    // not make user if duplicate userName (put it also in middleware)
    const u=await userModel.findOne({username:req.body.username});
    if(u)    return res.status(409).json({msg:"username already used"});

    const name=req.body.name;
    const username=req.body.username;
    const password=await hashPassword(req.body.password); // hash password
    const profilePic="";

    // create user in MongoDB
    try{
        await userModel.create({name,username,password,profilePic});
        return res.json({msg:"user created"});
    }catch(e){
        return res.status(500).json({msg:'server error'});
    }
}

module.exports=registerUser;