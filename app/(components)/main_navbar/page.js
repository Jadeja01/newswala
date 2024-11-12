"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../globals.css";
import { useState, useEffect } from "react";

export default function Main_Navbar() {
  const [token, setToken] = useState(false); // Default to `false`
  const pathname = usePathname(); 

  useEffect(() => {
    // Check localStorage on the client side
    const storedToken = localStorage.getItem("authToken") ? true : false;
    setToken(storedToken);
  }, []);

  function handleLogout() {
    localStorage.removeItem("authToken");
    setToken(false); // Update the state to reflect logout
    window.location.href = "/user";
  }

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
      <div style={{ flexBasis: "20%" }} className="d-flex">
        {token ? (
          <button onClick={handleLogout} type="button" className="me-1 btn btn-primary">
            Logout
          </button>
        ) : (
          <div>
            <Link href="/signup" type="button" className="me-1 btn btn-primary">
              Signup
            </Link>
            <Link href="/login" type="button" className="btn btn-primary m-2">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
