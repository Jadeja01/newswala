"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Bus_news({category}) {

  const Category = category==undefined ? "general" : category
  console.log('Category:',Category);
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = "71394d9ac17f4df486a392bced45d97f";
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${Category}&apiKey=${apiKey}`;
      try {
        const response = await axios.get(apiUrl);
        setArticles(response.data.articles);
        setLoading(false)
      } catch (error) {
        console.error("Error while fetching news:", error);
        setArticles([]);
        setLoading(true)
      }
    };
    fetchNews();
  }, [Category]);

  return (
    <div className="container">
      {loading ? (
        <p>Loading news...</p>
      ) : articles.length > 0 ? (
        <div className="row">
          {articles.map((e) => (
            <div className="col-md-4 mb-4" key={e.publishedAt}>
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
      ) : (
        <p>No articles available for {category}.</p>
      )}
    </div>
  );
}
