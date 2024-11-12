"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Bus_news({ category }) {
  const Category = category == undefined ? "general" : category;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [count,setCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "71394d9ac17f4df486a392bced45d97f";
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
      console.log("Url=",apiUrl)
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found");
        // Redirect to login if no token
        window.location.href = "/user";
        return;
      }

      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(response.data.articles);
        console.log('Articles:',articles);
        
        setTotalResults(response.data.totalResults);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching news:", error);
        setArticles([]);
        setLoading(true);
      }
    };
    fetchNews();
  }, [Category, currentPage]);

  // Handle pagination
  const handleNext = () => {
    if (currentPage * pageSize < totalResults) {
      setLoading(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading news...</p>
      ) : articles.length > 0 ? (
        <div>
          <div className="row">
            {articles.map((e,index) => (
              <div className="col-md-4 mb-4" key={`${e.url}-${index}`}>
                <div className="card h-100">
                  {e.urlToImage && (
                    <img
                      src={e.urlToImage}
                      className="card-img-top"
                      alt={e.title}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{e.title}</h5>
                    <p className="card-text">{e.description}</p>
                    <a
                      href={e.url}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between my-4">
            <button
              className="btn btn-secondary"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={currentPage * pageSize >= totalResults}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No articles available for {category}.</p>
      )}
    </div>
  );
}
