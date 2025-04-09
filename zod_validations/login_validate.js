const zod=require("zod");

const loginValidate=zod.object({
    username:zod.string().min(8),
    password:zod.string().min(8),
});

module.exports=loginValidate