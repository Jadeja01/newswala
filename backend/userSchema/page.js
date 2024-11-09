import mongoose from "mongoose";
mongoose.connect("mongodb+srv://forwork2004dev:_V!M!vTM3hiY8sU@clusterfornextjs.1xf1c.mongodb.net/")


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "user" + new Date().getMilliseconds(),
  },
});

// Check if the model is already compiled and, if not, define it.
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;