import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
      role
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.user.role === "teacher") {
      navigate("/teacher");
    } else {
      navigate("/student");
    }

  } catch (err) {
    alert("Login failed");
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit">Login</button>

        <p>
          Don't have account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
