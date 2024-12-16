import jwt from "jsonwebtoken";
import User from "@/backend/userSchema/page";

const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret key

export async function GET(req) {
  try {
    // Extract token from cookies (server-side approach)
    const token = req.cookies.get("authToken")?.value;
    console.log('Token=',token);
    

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    // Verify the token using JWT
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by decoded ID
    const user = await User.findById(decoded.id);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        username: user.username,
        email: user.email,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching user details" }),
      { status: 500 }
    );
  }
}
