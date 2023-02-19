import mongoose from "mongoose";

const {Schema} = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:Date,
        default:new Date().toLocaleString(),
        required:true
    }
})

export default mongoose.model("Blog",blogSchema)