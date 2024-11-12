// app/api/login/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/page.js";
import "../../../db/connect.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate a JWT token if credentials are valid
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log("Token when logging in: ", token);
    // Return the token and a success message
    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
