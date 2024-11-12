// app/api/signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/backend/userSchema/page.js";
import "../../../db/connect.js";

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req) {
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
    return NextResponse.json({ message: "Signup successful", token }, { status: 201 });
  } catch (error) {
    console.error("Error in signup route:", error); // Logs any server error
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
