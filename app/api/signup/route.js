// app/api/signup/route.js

import mongoose from "mongoose";
import User from "@/backend/userSchema/page";

if (!mongoose.connection.readyState) {
  mongoose.connect("mongodb+srv://forwork2004dev:_V!M!vTM3hiY8sU@clusterfornextjs.1xf1c.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((error) => console.error("Database connection error:", error));
}

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    
    const newUser = new User({
      name : username,
      email : email,
      password : password
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: "User created successfully!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server error:", error); // Log detailed error for debugging
    return new Response(JSON.stringify({ error: "Server error, please try again later." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
