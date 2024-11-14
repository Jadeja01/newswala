// app/components/Bus_comp.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "@/app/TokenContext/TokenContext";

export default function Bus_news({ category }) {
  console.log("useToken context::", useToken);
  const { token } = useToken(); // Access token from context
  console.log("Token from context", token);

  const Category = category || "general";
  const [confirmToken, setConfirmToken] = useState(token);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10;

    const fetchNews = async () => {
      console.log("Token inside fetchnews", confirmToken);

      if (!confirmToken) {
        console.log("No token found, skipping fetch.");
        setConfirmToken(null);
        window.location.href = "/user";
        return; // Only fetch news if token exists
      }

      try {
        const apiKey = "71394d9ac17f4df486a392bced45d97f";
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
        console.log("Fetching news from URL:", apiUrl);

        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.articles) {
          setArticles(response.data.articles);
          setTotalResults(response.data.totalResults);
          console.log("Fetched articles:", response.data.articles);
        } else {
          console.warn("No articles found in response.");
          setArticles([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching news (Bus_comp):", error);
        alert("Error fetching news. Please try again.");
        setArticles([]);
        setLoading(false); // Set to false on error to prevent indefinite loading
      }
    };

    useState(()=>{
      fetchNews();
    },[Category, currentPage]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading news...</p>
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
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage((prev) => prev + 1)}
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
