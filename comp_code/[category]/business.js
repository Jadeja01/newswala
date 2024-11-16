"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "@/app/TokenContext/TokenContext";

export default function Bus_news({ category }) {
  const { token } = useToken(); // Access token from context
  const Category = category || "general";
  const [confirmToken, setConfirmToken] = useState(token);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;

  const fetchNews = async () => {
    if (!confirmToken) {
      console.log("No token found, skipping fetch.");
      setConfirmToken(null);
      window.location.href = "/user";
      return; // Only fetch news if token exists
    }

    try {
      const apiKey = "71394d9ac17f4df486a392bced45d97f";
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;

      // Set loading to true before fetching news
      setLoading(true);

      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${confirmToken}` },
      });

      if (response.data && response.data.articles) {
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults);
      } else {
        setArticles([]);
      }

      setLoading(false); // Set loading to false after news is fetched
    } catch (error) {
      console.error("Error fetching news (Bus_comp):", error);
      alert("Error fetching news. Please try again.");
      setArticles([]);
      setLoading(false); // Set to false on error to prevent indefinite loading
    }
  };

  useEffect(() => {
    fetchNews();
  }, [Category, currentPage]);

  const handleNextPage = () => {
    if (currentPage * pageSize < totalResults) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading-state">
          <p>Loading news...</p>
        </div>
      ) : (
        <div>
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4 mb-4" key={`${article.url}-${index}`}>
                <div className="card h-100">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      className="card-img-top"
                      alt={article.title}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <a
                      href={article.url}
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
          <div className="d-flex justify-content-between my-4">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage * pageSize >= totalResults}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
