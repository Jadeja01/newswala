import mongoose from "mongoose";

mongoose.connect("mongodb+srv://forwork2004dev:_V!M!vTM3hiY8sU@clusterfornextjs.1xf1c.mongodb.net/").then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
