import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import dotenv from "dotenv"


const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/user", userRouter)
app.use("/api/blog",blogRouter)
dotenv.config()
mongoose.set('strictQuery',true)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 8000))
  .then(() => console.log(`LISTENING AT THE PORT ${process.env.PORT}`))
  .catch((err) => console.log(err));