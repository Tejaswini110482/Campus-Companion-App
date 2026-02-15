import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";   // ✅ Add this

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        role
      });

      alert("Registration successful");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
