import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/user.route.js"
import authRouters from "./routes/auth.route.js"
dotenv.config();



mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb");})
.catch((err)=>{
    console.log(err);
})
const app = express();

app.use(express.json());

app.listen(3000,()=>{
    console.log("connect MOGo");
})

app.use('/api/user',userRouters);
app.use('/api/auth',authRouters)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Sever Error'
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})