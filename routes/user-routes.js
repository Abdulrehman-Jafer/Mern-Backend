import express from "express"
import { getAllUser,signup,login,userById } from "../controllers/user-controller.js"
const userRouter = express.Router()

userRouter.get("/",getAllUser)
userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/:id",userById)
export default userRouter