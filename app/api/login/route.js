import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/user.js"; // Update file name if necessary
import "../../../db/connect.js";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find user and validate password
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid email or password (inside login route)" },
        { status: 401 }
      );
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      maxAge: 3600, // 1 hour expiration
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in login route:", error.message || error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
