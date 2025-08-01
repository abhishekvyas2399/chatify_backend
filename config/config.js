// Instead of using process.env.DB everywhere, we import config.js, making the code cleaner and modular.

const dotenv=require("dotenv")
const path=require("path")  // for cross patform compatibility bcz window use \ but mac use /

dotenv.config({path:path.join(__dirname,".env")});  // config() load envirnmental variable   (load secrets)
// path.join() for give platform based path


module.exports={
    DB:process.env.DB,
    PORT:process.env.PORT,
    JWTpassword:process.env.JWTpassword,
    s3access_key_id:process.env.access_key_id,
    s3secret_access_key:process.env.secret_access_key,
    s3endpoint:process.env.endpoint,
    s3region:process.env.region,
    s3bucket_name:process.env.bucket_name,
}