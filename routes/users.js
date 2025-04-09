const {Router}=require("express");
const router=Router();

router.get("/",(req,res)=>{ // get all user for a chat/groupchat
    res.json({msg:"this API coming soon....."});
});
router.get("/:id",(req,res)=>{ // get user details by id
    res.json({msg:"this API coming soon....."});
});
router.put("/:id",(req,res)=>{ // update user profile
    res.json({msg:"this API coming soon....."});
});
router.delete("/:id",(req,res)=>{ // delete user
    res.json({msg:"this API coming soon....."});
});

module.exports=router;