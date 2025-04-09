const zod=require("zod");

const user_validate=zod.object({
    name:zod.string().min(1),
    username:zod.string().min(8),
    password:zod.string().min(8)
});

module.exports=user_validate;