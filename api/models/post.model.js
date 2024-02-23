import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        userid:{
            type:String,
            require:true,
        },
        content:{
            type:String,
            require:true,

        },
        title:{
            type:String,
            require:true,
            unique:true
        },
        image:{
            type:String,
            default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Ftechnology-infographic&psig=AOvVaw3PQWUvVXnIyvWFr_160nn6&ust=1708759756538000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDZqKX4wIQDFQAAAAAdAAAAABAE'
        },
        category:{
            type:String,
            default:'uncategorized'
        },
        slug:{
            type:String,
            require:true,
            unique:true
        },

    },{timestamps:true}
);
const post = mongoose.model('post',userSchema)
export default post;