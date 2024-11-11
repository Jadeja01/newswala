// app/api/login/route.js
import { NextResponse } from "next/server";
import "../../../db/connect.js";
import User from "@/backend/userSchema/page.js";

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Parse the JSON body from the request

    const user = await User.findOne({ email, password });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
