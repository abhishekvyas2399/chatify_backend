const zod=require("zod");

const userValidate=zod.object({
    name:zod.string().min(4),
    username:zod.string().min(4),
    password:zod.string().min(8)
});

module.exports=userValidate;