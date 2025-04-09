const {Router}=require("express");
const router=Router();
// it should be in socket.io event by gpt
router.get("/",(req,res)=>{ // get unread notification
    res.json({msg:"this API coming soon....."});
});
router.post("/mark_as_read",(req,res)=>{ // mark messages as read
    res.json({msg:"this API coming soon....."});
});

module.exports=router;
