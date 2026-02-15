import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Teacher Panel</h3>

      <Link to="/teacher/events">Events</Link>
      <Link to="/teacher/assignments">Assignments</Link>
      <Link to="/teacher/attendance">Attendance</Link>
    </div>
  );
}

export default Sidebar;
