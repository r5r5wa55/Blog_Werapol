import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/user.route.js"

dotenv.config();



mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb");})
.catch((err)=>{
    onsole.log(err);
})
const app = express();
app.listen(3000,()=>{
    console.log("werapol");
})

app.use('/api/user',userRouters)