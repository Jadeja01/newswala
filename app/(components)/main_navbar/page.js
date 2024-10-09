"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Use this hook to get the current pathname
import "../../globals.css";

export default function Main_Navbar() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <nav className="mb-5 navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                href="/" 
                className={`nav-link ${pathname === "/" ? "underline nav-link-blue" : ""}`} 
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/business" 
                className={`nav-link ${pathname === "/business" ? "underline nav-link-blue" : ""}`}
              >
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/sports" 
                className={`nav-link ${pathname === "/sports" ? "underline nav-link-blue" : ""}`}
              >
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/entertainment" 
                className={`nav-link ${pathname === "/entertainment" ? "underline nav-link-blue" : ""}`}
              >
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/health" 
                className={`nav-link ${pathname === "/health" ? "underline nav-link-blue" : ""}`}
              >
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/science" 
                className={`nav-link ${pathname === "/science" ? "underline nav-link-blue" : ""}`}
              >
                Science
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
