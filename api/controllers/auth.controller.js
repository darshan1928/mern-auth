import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
const signup = async (req, res, next) => {
    const { username, password, email } = req.body;
    console.log("req.body==", req.body);
    const hashedPassword = await bcryptjs.hash(password, 10);
    try {
        const userData = await User.create({
            username,
            password: hashedPassword,
            email,
        });
        res.json({
            message: "user added successfully",
            data: userData,
        });
    } catch (error) {
        next(error);
    }
};

export { signup };

export const signIn = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const userData = await User.findOne({ username: username });

        if (!userData) {
            res.json({
                status: false,
                message: "User not found",
                errorcode: 1,
                data: null,
            });
            return
        }
        const verifyPassword = await bcryptjs.compare(password, userData.password);
        if (!verifyPassword) {
            res.json({
                status: false,
                message: "Password not matching",
                errorcode: 2,
                data: null,
            });
            return
        }
        const token = jwt.sign({id:userData._id},process.env.JWT_SECRET,{expiresIn:"30m"})
        const {password:hashedPassword,...rest}=userData._doc

            res.cookie('access_token',token,{httpOnly:true}).status(200).json({
                status: true,
                message: "successfully login",
                errorcode: 0,
                data: rest,
            });



    } catch (error) {
        next(error);
    }
};
