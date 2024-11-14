import { NextResponse } from "next/server";

export async function GET(req) {
  // Retrieve the auth token from the cookies
  const token = req.cookies.get("authToken");

  // Check if the token exists in cookies
  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  // Return the token in the response
  return NextResponse.json({ token });
}
