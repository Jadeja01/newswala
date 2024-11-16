"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../globals.css";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "@/app/TokenContext/TokenContext";
import { useRouter } from "next/navigation";

export default function Main_Navbar() {
  const { token, setToken } = useToken(); // Track if the user is logged in or not
  const pathname = usePathname();
  const router = useRouter();
  const [profileVisible, setProfileVisible] = useState(false); // Track profile dropdown visibility
  const [userDetails, setUserDetails] = useState(null); // Store user details

  // Fetch user details when token is available
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!token) return;

      try {
        console.log('TOKEN=',token);
        const response = await axios.get("/api/getUserDetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserDetails(response.data); // Update user details state
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.get("/api/cleartoken"); // Call the API route to clear the cookie
      Cookies.remove("authToken"); // Clear any client-side storage if applicable
      setToken(null); // Update context
      router.push("/user"); // Redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="d-flex justify-content-around p-2 mb-5 navbar navbar-expand-lg navbar-light bg-light">
      <div style={{ flexBasis: "80%" }} className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${
                  pathname === "/" ? "underline nav-link-blue" : ""
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/business"
                className={`nav-link ${
                  pathname === "/business" ? "underline nav-link-blue" : ""
                }`}
              >
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/sports"
                className={`nav-link ${
                  pathname === "/sports" ? "underline nav-link-blue" : ""
                }`}
              >
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/entertainment"
                className={`nav-link ${
                  pathname === "/entertainment" ? "underline nav-link-blue" : ""
                }`}
              >
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/health"
                className={`nav-link ${
                  pathname === "/health" ? "underline nav-link-blue" : ""
                }`}
              >
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/science"
                className={`nav-link ${
                  pathname === "/science" ? "underline nav-link-blue" : ""
                }`}
              >
                Science
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {token ? (
        <div className="d-flex justify-content-around align-item-center">
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: 3,
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setProfileVisible((prev) => !prev)} // Toggle profile visibility
          >
            {userDetails?.username[0]?.toUpperCase() || "U"}
          </div>
          {profileVisible && (
            <div
              style={{
                position: "absolute",
                top: "60px",
                right: "20px",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                borderRadius: "5px",
                zIndex: 1000,
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Username:</strong> {userDetails?.username}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Email:</strong> {userDetails?.email}
              </p>
              <button
                onClick={handleLogout}
                className="btn btn-danger mt-2"
                style={{ width: "100%" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{ flexBasis: "20%" }}
          className="d-flex justify-content-around align-item-center"
        >
          <Link href="/signup" className="btn btn-primary">
            Signup
          </Link>
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
