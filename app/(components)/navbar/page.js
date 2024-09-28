import Link from "next/link";
import Bus_news from "@/comp_code/news_sec/business.js";

export default function Navbar() {
  return (<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              <Link href="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/business" className="nav-link">Business</Link>
            </li>
            <li className="nav-item">
              <Link href="/sports" className="nav-link">Sports</Link>
            </li>
            
            <li className="nav-item">
              <Link href="/entertainment" className="nav-link">Entertainment</Link>
            </li>
            <li className="nav-item">
              <Link href="/health" className="nav-link">Health</Link>
            </li>
            <li className="nav-item">
              <Link href="/science" className="nav-link">Science</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Bus_news category="sports"/>
    </div>
  );
}
