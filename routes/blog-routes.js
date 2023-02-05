import express from "express"
import { getAllBlogs } from "../controllers/blog-controller"
import { addBlog } from "../controllers/blog-controller"
import { updateBlog } from "../controllers/blog-controller"
import { blogById } from "../controllers/blog-controller"
import { deleteBlog } from "../controllers/blog-controller"
import { userBlogs } from "../controllers/blog-controller"


const blogRouter = express.Router()

blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",blogById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",userBlogs)

export default blogRouter