import React, { useState } from "react";
import "../styling/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }

    // Role based display logic missing
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <label className="login-label">
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" />
        </label>
        <br />
        <label className="login-label">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
        </label>
        <br />
        <button type="button" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
