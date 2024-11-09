"use client"
import mongoose from "mongoose";
export default function Login() {
  function handleSubmit(){
    
    alert("Login successfull")
  }

  return (
    <div className="p-5">
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
          required
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We will never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
          required
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="mt-2 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
