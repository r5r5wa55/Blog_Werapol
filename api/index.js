import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"
import postRouters from "./routes/post.route.js"
import commentRouters from "./routes/comment.route.js"
import cookieParser from "cookie-parser";

dotenv.config();



mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb");})
.catch((err)=>{
    console.log(err);
})
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log("connect MOGo");
})

app.use('/api/user',userRouters);
app.use('/api/auth',authRouters);
app.use('/api/post',postRouters);
app.use('/api/comment',commentRouters);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})