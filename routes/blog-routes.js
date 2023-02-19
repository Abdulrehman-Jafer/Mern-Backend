import express from "express"
import { getAllBlogs,addBlog,updateBlog,blogById,deleteBlog,userBlogs } from "../controllers/blog-controller.js"

const blogRouter = express.Router()


blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",blogById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",userBlogs)

export default blogRouter