import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const isAuth = localStorage.getItem("isAuth");
  const userRole = localStorage.getItem("role");

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
