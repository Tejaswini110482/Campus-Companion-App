import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function TeacherLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherLayout;
