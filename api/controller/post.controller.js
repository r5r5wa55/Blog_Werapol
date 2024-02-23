import post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req,res,next)=>{
    console.log(req.user    );
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You not create post'))
    }   
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide  all requried field'))

    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost  = new post ( {
        ...req.body,slug,userId:req.user.id
    })
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost)
    } catch (error) {
        next(error)
    }
}