const bcrypt= require("bcryptjs");

async function hashPassword(password){
    const salt= await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

async function compareWithHashed_password(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword);
}

module.exports={hashPassword,compareWithHashed_password};