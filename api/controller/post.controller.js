import Post from "../models/post.model.js";
import User from "../models/user.model.js";


import { errorHandler } from "../utils/error.js"

export const create = async (req,res,next)=>{
    // console.log(req.user);
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You not create post'))
    }   
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide  all requried field'))

    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9ก-๙]/g, '-');
    const newPost  = new Post ( {
        ...req.body,slug,userId:req.user.id
    })
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost)
    } catch (error) {
        next(error)
    }
}

export const getposts = async(req,res,next)=>{
  
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirenction = req.query.order === 'asc' ? 1:-1;

        
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
              $or: [
                { title: { $regex: req.query.searchTerm, $options: 'i' } },
                { content: { $regex: req.query.searchTerm, $options: 'i' } },
              ],
            }),
          })
          .sort({ updatedAt: sortDirenction })
          .skip(startIndex)
          .limit(limit);

        
         const totalPosts = await Post.countDocuments();

         const now = new Date();
     
         const oneMonthAgo = new Date(
           now.getFullYear(),
           now.getMonth() - 1,
           now.getDate()
         );
     
         const lastMonthPosts = await Post.countDocuments({
           createdAt: { $gte: oneMonthAgo },
         });
     
         res.status(200).json({
           posts,
           totalPosts,
           lastMonthPosts,
         });
       } catch (error) {
         next(error);
       }
}

export const deletepost = async(req,res,next)=>{
  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandler(403,'You are not allowed to delete this post'))
  }
  try {
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json('The post has been delete')
  } catch (error) {
    next(error)
  }
}

export const updatepost = async(req,res,next)=>{
  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandler(403, 'You are not allowed to update this post '))
  }
  try {
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postId,{
        $set:{
          title:req.body.title,
          content:req.body.content,
          category:req.body.category,
          image:req.body.image
        }
      },{
        new:true
      })      

      res.status(200).json(updatePost)
  } catch (error) {
    next(error)
  }
} 

export const getusers = async(req,res,next)=>{

  if(!req.user.isAdmin){
    return next(errorHandler(403,'You are not allowed to see all users'))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9;
    const sortDirenction = parseInt(req.query.sort) || 'asc';
    console.log(limit);
    console.log(sortDirenction);

    const users = await User.find()
    .sort({createAdAt:sortDirenction})
    .skip(startIndex)
    .limit(limit)

    const usersWithOutPassword = users.map((user)=>{
      const {password , ...rest} = user._doc;
      return rest;
    })

    const totalUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    )
    const lastMonthUsers = await User.countDocuments({
      createdAt:{$gte:oneMonthAgo},
    });
    res.status(200).json({
      user:usersWithOutPassword,
      totalUsers,
      lastMonthUsers
    })
  } catch (error) {
    console.log(error);
  }


}