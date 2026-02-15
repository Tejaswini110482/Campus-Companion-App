import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/teacher.css";

function TeacherDashboard() {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handlesave = async() => {
    if (!subject || !date)
      return alert("Fill subject and date");

    try {
      await axios.post("http://localhost:5000/attendance", {
        subject,
        date
      });
      alert("Attendance saved successfully ✅");
    } catch (error) {
      console.log("Error saving attendance");
    }
  }

  const [subject, setSubject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");

  const [date, setDate] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentSubject, setAssignmentSubject] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/assignment");
      setAssignments(res.data);
    } catch (error) {
      console.log("Error fetching assignments");
    }
  };

  const addAssignment = async () => {
    if (!assignmentTitle || !assignmentSubject || !dueDate)
      return alert("Fill all fields");

    try {
      await axios.post("http://localhost:5000/assignment", {
        title: assignmentTitle,
        subject: assignmentSubject,
        dueDate
      });

      alert("Assignment Added Successfully ✅");

      setAssignmentTitle("");
      setAssignmentSubject("");
      setDueDate("");

      fetchAssignments();
    } catch (error) {
      console.log("Error adding assignment");
    }
  };

  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/assignment/${id}`);
      fetchAssignments();
    } catch (error) {
      console.log("Error deleting assignment");
    }
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="teacher-navbar">
        <h2>Teacher Panel</h2>
        <ul>
          <li onClick={() => navigate("/teacher")}>Dashboard</li>
          <li onClick={() => navigate("/teacher/attendance")}>Attendance</li>
          <li onClick={() => navigate("/teacher/events")}>Events</li>
        </ul>
      </div>

      <div className="main-content">

        {/* Profile */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

        <h1>Teacher Dashboard</h1>

        {/* Attendance Button */}
       {/* Attendance Section */}
<div className="form-box">
  <h3>Attendance</h3>

  <input
    type="text"
    placeholder="Subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
  />

  <input
    type="date"
    value={attendanceDate}
    onChange={(e) => setAttendanceDate(e.target.value)}
  />

  <button
    onClick={() => {
      if (!subject || !attendanceDate) {
        alert("Please fill subject and date");
        return;
      }

      navigate("/teacher/attendance", {
        state: {
          subject: subject,
          date: attendanceDate
        }
      });
    }}
    style={{
      padding: "10px 20px",
      backgroundColor: "#6366f1",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px"
    }}
  >
    Add Attendance
  </button>
</div>


        {/* Add Assignment */}
        <div className="form-box">
          <input
            type="text"
            placeholder="Assignment Title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            value={assignmentSubject}
            onChange={(e) => setAssignmentSubject(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button onClick={addAssignment}>
            Add Assignment
          </button>
        </div>

        {/* Assignment List */}
        <div className="section">
          <h3>Assignments</h3>

          {assignments.length === 0 && <p>No Assignments Added</p>}

          {assignments.map((item) => (
            <div className="card" key={item._id}>
              <div>
                <b>{item.title}</b>
                <p>{item.subject}</p>
                <p>Due Date: {item.dueDate}</p>
              </div>

              <button onClick={() => deleteAssignment(item._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TeacherDashboard;
