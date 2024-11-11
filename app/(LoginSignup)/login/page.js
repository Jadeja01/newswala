"use client";

export default function Login() {
  async function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get the email and password values from the form
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
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
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="mt-2 btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
