"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    const reqBody = { email, password };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
        credentials: "include",
      });

      console.log("response=",response);
      const data = await response.json();
      console.log("data=",data);
      if (!response.ok) {
        throw new Error("Invalid email or password!!!");
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            required
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="mt-2 btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
