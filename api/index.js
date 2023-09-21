import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./route/user.route.js";
import authRouter from "./route/auth.route.js";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`server running @ ${PORT}`);
});
app.use((err, req, res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
