"use client"
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the context
const TokenContext = createContext(null);

// Custom hook to use the token context
export const useToken = () => useContext(TokenContext);

// Provider component to wrap the app and manage token fetching
export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Fetch the token from the `/api/gettoken` endpoint
        const response = await axios.get("/api/gettoken");
        const fetchedToken = response.data?.token.value;
        console.log('fetchedToken in context',fetchedToken);
        
        if (fetchedToken) {
          setToken(fetchedToken);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
