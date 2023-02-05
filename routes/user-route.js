import express from "express"
import { getAllUser } from "../controllers/user-controller"
import { signup } from "../controllers/user-controller"
import { login } from "../controllers/user-controller"
const router = express.Router()

router.get("/",getAllUser)
router.post("/signup",signup)
router.post("/login",login)
export default router