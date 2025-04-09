const {Router}=require("express")
const router=Router();

const registerUser=require("../controller/auth/register_User.controller")
const loginUser=require("../controller/auth/login_user.controller");
const my_profile=require("../controller/auth/my_profile.controller");

const jwtAuthentication=require("../middleware/jwtAuthentication")



router.post("/register",registerUser); // register new user
router.post("/login",loginUser); // authenticate user & return JWT
router.post("/logout",(req,res)=>{ // logout user
    res.clearCookie("authorization",{httpOnly:true,sameSite:"none"});  // tell browser to clear "authorization" cookie from cookie which store jwt so no jwt = logout
    res.json({msg:"logout succesfully"});
});
router.get("/me",jwtAuthentication,my_profile);
router.get("/tokenVerify",jwtAuthentication,(req,res)=>{
    res.json({msg:"valid user"});
})
// get current logged in user



module.exports=router;