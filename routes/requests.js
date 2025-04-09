const {Router}=require("express");
const router=Router();

const jwtAuthentication=require("../middleware/jwtAuthentication");

const sendController=require("../controller/requests/send.controller");
const pendingController=require("../controller/requests/pending.controller");
const acceptController=require("../controller/requests/accept.controller");
const rejectController=require("../controller/requests/reject.controller");


router.post("/send",jwtAuthentication,sendController);   // send request  == make request in DB
router.get("/pending",jwtAuthentication,pendingController);   // give all request_came_to_user/pending_request
router.post("/accept/:requestID",jwtAuthentication,acceptController);  //accept a request
router.post("/reject/:requestID",jwtAuthentication,rejectController);  // reject a request
// router.post("/cancel/:requestID",jwtAuthentication,);   // cancel a not accpeted request
// router.post("/status/:requestID",jwtAuthentication,);   // check request status
// router.post("/sent/:requestID",jwtAuthentication,);   // get all sent request


module.exports=router;