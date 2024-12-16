import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/page.js";
import "../../../db/connect.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find user and validate password
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    

    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    console.log("Cookie when login",response.cookies)
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      maxAge: 3600, // 1 hour expiration
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
