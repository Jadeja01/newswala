"use client";

import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Start loading state

    const reqBody = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      console.log("response=",response);
      const data = await response.json();
      console.log("data=",data);
      if (!response.ok) {
        // Extract error message from the response, if available
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating user.");
      }

      // Success: Redirect to homepage or another page
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  }

  return (
    <div className="p-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
