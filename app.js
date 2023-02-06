import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-route";
import blogRouter from "./routes/blog-routes";

const app = express();
app.use(express.json());
app.use("/api/user", router)
app.use("/api/blog",blogRouter)

mongoose
  .connect(
    "mongodb+srv://*********:*********@node-cluster.e3ibxci.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("LISTENING AT THE PORT 5000"))
  .catch((err) => console.log(err));
