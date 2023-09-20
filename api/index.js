import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./route/user.route.js"
const PORT = 3000;

const app = express();
app.use(cors());
dotenv.config()


mongoose.connect(process.env.MONGO).then(()=>{console.log("DB connected")}).catch((err)=>{console.log(err);})


app.use("/api/user",userRouter)


app.listen(PORT, () => {
    console.log(`server running @ ${PORT}`);
});
