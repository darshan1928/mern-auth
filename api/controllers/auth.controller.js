
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"

const authController= async(req,res)=>{
    const {username,password,email}=req.body
    const hashedPassword= await bcryptjs.hash(password,10)
try {
    const userData= await User.create({
        username,password:hashedPassword,email
     })
    res.json({
        message:"user added successfully",
        data:userData
     })
} catch (error) {
    console.log(error);
}


   
}

export {authController}