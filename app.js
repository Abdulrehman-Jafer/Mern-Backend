import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/user-route";
import blogRouter from "./routes/blog-routes";
import dotenv from "dotenv"

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/user", router)
app.use("/api/blog",blogRouter)
dotenv.config()
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => app.listen(process.env.PORT || 8000))
  .then(() => console.log("LISTENING AT THE PORT 5000"))
  .catch((err) => console.log(err));
