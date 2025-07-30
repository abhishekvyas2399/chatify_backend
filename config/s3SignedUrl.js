const {S3Client,PutObjectCommand,GetObjectCommand}=require('@aws-sdk/client-s3');
const {getSignedUrl}=require('@aws-sdk/s3-request-presigner');

const {v4}=require('uuid');

const { s3region, s3endpoint, s3access_key_id, s3secret_access_key, s3bucket_name }=require('./config');
const s3=new S3Client({
    region:s3region,
    endpoint:s3endpoint,
    credentials:{
        accessKeyId:s3access_key_id,
        secretAccessKey:s3secret_access_key,
    },
    forcePathStyle:true,
});

async function getUploadPresignedUrl_s3(username,fileType){
    if(!username)   return null;
    if(!fileType)   return null;
    const fileExtension=fileType.includes('/')?fileType.split('/').pop():null;
    if(!fileExtension)   return null;
    const uniqueFileName=Date.now()+v4();
    const filePath=`${username}/${uniqueFileName}.${fileExtension}`;

    const command=new PutObjectCommand({
        Bucket:s3bucket_name,
        Key:filePath,
        ContentType:fileType,
    });

    const signedUrl=await getSignedUrl(s3,command,{expiresIn:60});

    return {signedUrl,filePath,fileType};
}

async function getDownloadPresignedUrl_s3(filePath){
    if(!filePath)   return  null;
    const command=new GetObjectCommand({
        Bucket:s3bucket_name,
        Key:filePath,
        ResponseCacheControl:'max-age=1800',
        // ResponseContentDisposition: "attachment",
    });
    const signedUrl=await getSignedUrl(s3,command,{expiresIn:600});
    return signedUrl;
}

module.exports={getUploadPresignedUrl_s3,getDownloadPresignedUrl_s3};