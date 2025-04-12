const {Router}=require("express");
const router=Router();

const jwtAuthentication=require("../middleware/jwtAuthentication")

const StoreMessage=require("../controller/message/storeMessage.controller")
const getOldReadedMessage=require("../controller/message/getOldReadedMessage.Controller")
const getUnreadedMessage=require("../controller/message/getUnreadedMessage.controller")
const markMsgReaded=require("../controller/message/markMsgReaded.controller")

// (we use socket to send message but before it we store it to DB by restAPI) but why?
// chatGPT:-
	// •	REST API ensures authentication, security, and data consistency.
	// •	WebSocket remains lightweight, handling only real-time events.
	// •	Scales better, as DB writes and real-time events are separated.
	// •	Easier to implement message history, retries, and logging.

router.post("/",jwtAuthentication,StoreMessage);    // store message
router.get("/unreadedMessage/:chatId",jwtAuthentication,getUnreadedMessage);    // give all unreaded message
router.get("/oldReadedMessage/:chatId",jwtAuthentication,getOldReadedMessage); // give old readed message of chat by pagination (20-20)

router.post("/read/:chatId",jwtAuthentication,markMsgReaded); // mark msg readed

module.exports=router;