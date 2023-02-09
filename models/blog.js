import mongoose from "mongoose";
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
    image:{
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