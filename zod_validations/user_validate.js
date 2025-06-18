const zod=require("zod");

const user_validate=zod.object({
    name:zod.string().min(4),
    username:zod.string().min(4),
    password:zod.string().min(8)
});

module.exports=user_validate;