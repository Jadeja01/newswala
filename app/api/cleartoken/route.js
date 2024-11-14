// app/api/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the authToken cookie by setting it with an expired date
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire the cookie immediately
    path: "/",
  });
  return response;
}
