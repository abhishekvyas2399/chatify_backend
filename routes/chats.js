const {Router}=require("express");
const router=Router();

const jwtAuthentication=require("../middleware/jwtAuthentication")

const getAllChat=require("../controller/chats/getAllChat.controller")

// done by request accept or not.
// router.post("/",jwtAuthentication,(req,res)=>{ //create new chat
//     res.json({msg:"this API coming soon....."});
// });
router.get("/",jwtAuthentication,getAllChat);    //get all chat of a loged in user
router.get("/:chatID",jwtAuthentication,(req,res)=>{  // get a specific chat detail
    res.json({msg:"this API coming soon....."});
});
router.put("/:chatID",jwtAuthentication,(req,res)=>{  // update chat name
    res.json({msg:"this API coming soon....."});
});
router.delete("/:chatID",jwtAuthentication,(req,res)=>{  // delete chat
    res.json({msg:"this API coming soon....."});
});

module.exports=router;