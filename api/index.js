import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();
const app = express();


mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("mongodb");})
.catch((err)=>{
    onsole.log(err);
})

app.listen(3000,()=>{
    console.log("werapol");
})