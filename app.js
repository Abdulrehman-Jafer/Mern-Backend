import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/user-route";
import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json());
// Understood Unable to use Api in react app running at different port without the cors
app.use(cors())
app.use("/api/user", router)
app.use("/api/blog",blogRouter)

mongoose
  .connect(
    "mongodb+srv://Abdulrehman-Jafer:Paswordhai2007@node-cluster.e3ibxci.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("LISTENING AT THE PORT 5000"))
  .catch((err) => console.log(err));
