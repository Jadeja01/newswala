// app/api/signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/page.js";
import "../../../db/connect.js";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validate environment variable
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({ message: "Signup successful" });
    response.cookies.set("authToken", token, {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client side
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
      maxAge: 3600, // 1 hour expiration (in seconds)
      path: "/", // Available across the entire application
    });

    return response;
  } catch (error) {
    console.error("Error in signup route:", error.message || error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
