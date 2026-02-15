import { useEffect, useState } from "react";
import "../styles/dashboard.css";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("attendance")) || [];
    setAttendance(saved);
  }, []);

  return (
    <div className="dashboard-content">
      <h2>Your Attendance</h2>

      <div className="card-container">
        {attendance.map((item) => (
          <div key={item.id} className="card student-card">
            <h3>{item.day}</h3>
            <p>Date: {item.date}</p>
            <p
              className={
                item.status === "Present" ? "present" : "absent"
              }
            >
              Status: {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentAttendance;
