"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Bus_news({ category }) {
  const Category = category == undefined ? "general" : category;
  console.log("Category:", Category);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalResults, setTotalResults] = useState(0); // Track total results from API
  const pageSize = 10; // Number of articles per page

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "71394d9ac17f4df486a392bced45d97f";
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        console.log("Data=", response.data);
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults); // Save total results from the API
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching news:", error);
        setArticles([]);
        setLoading(true);
      }
    };
    fetchNews();
  }, [Category, currentPage]);

  // Function to handle next button click
  const handleNext = () => {
    if (currentPage * pageSize < totalResults) {
      setLoading(true)
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setLoading(true)
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
            {articles.map((e) => (
              <div className="col-md-4 mb-4" key={e.url}>
                <div className="card h-100">
                  {e.urlToImage && (
                    // eslint-disable-next-line @next/next/no-img-element
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
