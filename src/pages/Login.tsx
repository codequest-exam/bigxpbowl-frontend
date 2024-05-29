import { useContext, useState } from "react";
import { RoleContext } from "../services/RoleContext.tsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styling/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const roleContext = useContext(RoleContext);
  const { setRole } = roleContext;

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      console.log("Login successful");
      setRole("admin");
      toast.success("Login successful, logged in as Admin");
      navigate("/");
    } else if (username === "operator" && password === "operator") {
      console.log("Login successful");
      setRole("operator");
      toast.success("Login successful, logged in as Operator");
      navigate("/");
    } else if (username === "employee" && password === "employee") {
      console.log("Login successful");
      setRole("employee");
      toast.success("Login successful, logged in as Employee");
      navigate("/");
    } else {
      console.log("Login failed");
      setRole("guest");
      toast.error("Login failed");
    }
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
