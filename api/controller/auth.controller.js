import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";
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

} ;


export const signin = async(req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password || email===''||password===''){
        next(errorHandler(400,'all field'));
    }
    try {
        const vaidlUser = await User.findOne({email})
        if(!vaidlUser){
            next(404,'ไม่มีผู้ใช้')
        }
        const vaildPassword = bcryptjs.compareSync(password,vaidlUser.password)
        if(!vaildPassword){
           return next(400,'รหัสผ่านไม่ถูกต้อง')
        }
        const token = jwt.sign({id:vaidlUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=vaidlUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(rest)
    } catch (error) {
        next(error)
    }
    
}