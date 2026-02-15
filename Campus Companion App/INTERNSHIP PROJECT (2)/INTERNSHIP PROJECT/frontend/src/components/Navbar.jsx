import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h2>Campus Companion</h2>
      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
