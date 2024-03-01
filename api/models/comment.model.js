import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema({
        content:{
            type:String,
            require:true,
        },
        postId:{
            type:String,
            require:true,
        },
        userId:{
            type:String,
            require:true,
        },
        likes:{
            type:Array,
            default:[]
        },
        likes:{
            type:String,
            require:true,
        },
        numberOfLike:{
            type:Number,
            require:0,
        }
},{timestamps:true})

const Comment = mongoose.model('Comment',commentSchema)
export default Comment;