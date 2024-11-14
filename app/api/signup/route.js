// app/api/signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/page.js";
import "../../../db/connect.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req, res) {
  try {
    const { username, email, password } = await req.json();

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
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Token when signing: ", token);

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
    console.error("Error in signup route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
