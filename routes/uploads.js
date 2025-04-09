const {Router}=require("express");
const router=Router();

router.post("/avatar",(req,res)=>{ // upload user profile
    res.json({msg:"this API coming soon....."});
});
router.post("/chat_media",(req,res)=>{ // upload chat media
    res.json({msg:"this API coming soon....."});
});

module.exports=router;