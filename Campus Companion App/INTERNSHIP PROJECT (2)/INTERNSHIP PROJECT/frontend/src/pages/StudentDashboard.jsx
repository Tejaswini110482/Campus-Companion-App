import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/student.css";

function StudentDashboard() {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (user) {
      fetchAttendance();
      fetchAssignments();
    }
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/attendance");

      const studentRecords = res.data.map(record => {
        const studentData = record.students.find(
          s => String(s.studentId) === String(user._id)
        );


        return studentData ? {
          id: record._id,
          subject: record.subject,
          date: record.date,
          status: studentData.status
        } : null;
      }).filter(Boolean);

      setAttendance(studentRecords);

    } catch (error) {
      console.log("Error fetching attendance");
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/assignment");
      setAssignments(res.data);
    } catch (error) {
      console.log("Error fetching assignments");
    }
  };

  const totalClasses = attendance.length;
  const presentCount = attendance.filter(
    record => record.status === "present"
  ).length;

  const percentage =
    totalClasses > 0
      ? ((presentCount / totalClasses) * 100).toFixed(2)
      : 0;

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="student-navbar">
        <h2>Student Panel</h2>
        <ul>
          <li>Assignments</li>
          <li>Attendance</li>
          <li>Event</li>
        </ul>
      </div>

      <div className="main-content">

        {/* Profile */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px"
        }}>
          {user && (
            <div style={{
              background: "#6366f1",
              padding: "10px 15px",
              borderRadius: "10px",
              color: "white"
            }}>
              {user.name} ({user.role})

              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "15px",
                  background: "red",
                  border: "none",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <h1>Student Dashboard</h1>

        {/* Attendance Section */}
        <div className="section">
          <h3>Attendance</h3>

          <div className="card">
            <b>Overall Attendance Percentage</b>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              {percentage}%
            </p>
          </div>

          {attendance.length === 0 && <p>No Attendance Records</p>}

          {attendance.map((item) => (
            <div className="card" key={item.id}>
              <b>{item.subject}</b>
              <p>Date: {item.date}</p>
              <p>
                Status:
                <span style={{
                  marginLeft: "8px",
                  color: item.status === "present" ? "green" : "red"
                }}>
                  {item.status}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Assignments Section */}
        <div className="section">
          <h3>Assignments</h3>

          {assignments.length === 0 && <p>No Assignments</p>}

          {assignments.map((item) => (
            <div className="card" key={item._id}>
              <b>{item.title}</b>
              <p>Subject: {item.subject}</p>
              <p>Due Date: {item.dueDate}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
