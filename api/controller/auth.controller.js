import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";

export const  signup = async(req,res,next)=>{

    console.log(req.body);
    const {username,email,password} = req.body;
    
    if(!username || !email || !password || username === "" || email === "" || password === ""){
        next(errorHandler(400,"all field are required"))
    }
    const passhash = bcryptjs.hashSync(password,10);    

    const newUser = new User({
        username,
        email,
        password:passhash,
    });
    try{
        await newUser.save();
        res.json("Successs");
    }catch(error){
        next(error);
        // res.status(400).json({message:error.message})
    } 

} 