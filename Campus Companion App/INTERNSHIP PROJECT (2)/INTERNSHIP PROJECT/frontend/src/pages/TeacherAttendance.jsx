import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/teacherAttendance.css";



function TeacherAttendance() {

  const token = localStorage.getItem("token");
  const location = useLocation();

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const [newName, setNewName] = useState("");
  const [newRoll, setNewRoll] = useState("");

  useEffect(() => {
    if (location && location.state) {
      setSubject(location.state.subject || "");
      setDate(location.state.date || "");
    }
  }, []);


  // ================= FETCH DATA =================
  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/students",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setStudents(res.data);
    } catch (err) {
      console.log(err.response?.data || "Error fetching students");
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/attendance",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAttendanceList(res.data);
    } catch (err) {
      console.log(err.response?.data || "Error fetching attendance");
    }
  };

  // ================= ADD STUDENT =================
  const handleAddStudent = async () => {
    if (!newName || !newRoll)
      return alert("Fill student name and roll number");

    try {
      await axios.post(
        "http://localhost:5000/students",
        {
          name: newName,
          rollNo: newRoll,
          role: "student"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Student added successfully");

      setNewName("");
      setNewRoll("");
      fetchStudents();

    } catch (err) {
      console.log(err.response?.data || "Error adding student");
    }
  };

  // ================= DELETE STUDENT =================
  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/students/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchStudents();

    } catch (err) {
      console.log(err.response?.data || "Error deleting student");
    }
  };

  // ================= SAVE ATTENDANCE =================
  const handleSave = async () => {

  console.log("Save clicked");
  console.log("Subject:", subject);
  console.log("Date:", date);
  console.log("Selected Students:", selectedStudents);

  if (!subject || !date) {
    alert("Subject or Date missing");
    return;
  }

  const attendanceData = students.map(student => ({
    studentId: student._id,
    name: student.name,
    rollNo: student.rollNo,
    status: selectedStudents.includes(student._id)
      ? "present"
      : "absent"
  }));

  console.log("Sending this data:", {
    subject,
    date,
    students: attendanceData
  });

  try {
    const response = await axios.post(
      "http://localhost:5000/attendance",
      {
        subject,
        date,
        students: attendanceData
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    console.log("Server Response:", response.data);

    alert("Attendance saved successfully ✅");

    setSelectedStudents([]);
    fetchAttendance();

  } catch (err) {
    console.log("ERROR FROM SERVER:", err.response?.data || err.message);
  }
};



  // ================= DELETE ATTENDANCE =================
  const handleDeleteAttendance = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/attendance/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchAttendance();

    } catch (err) {
      console.log(err.response?.data || "Error deleting attendance");
    }
  };

  return (
    <div className="attendance-container">

      {/* ADD STUDENT */}
      <h3>Add Student</h3>

      <div className="form-row">
        <input
          type="text"
          placeholder="Student Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={newRoll}
          onChange={(e) => setNewRoll(e.target.value)}
        />

        <button onClick={handleAddStudent}>Add</button>
      </div>

      {/* STUDENT LIST */}
      <div className="student-list">
        {students.map(student => (
          <div key={student._id} className="student-item">

            <input
              type="checkbox"
              checked={selectedStudents.includes(student._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedStudents([...selectedStudents, student._id]);
                } else {
                  setSelectedStudents(
                    selectedStudents.filter(id => id !== student._id)
                  );
                }
              }}
            />

            <span>
              {student.rollNo} - {student.name}
            </span>

            <button
              className="delete-btn"
              onClick={() => handleDeleteStudent(student._id)}
            >
              Delete
            </button>

          </div>
        ))}
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Attendance
      </button>

      {/* ATTENDANCE RECORDS */}
      <h3 style={{ marginTop: "40px" }}>Attendance Records</h3>

      {attendanceList.map(record => (
        <div key={record._id} className="record-card">
          <h4>{record.subject}</h4>
          <p>Date: {record.date}</p>
          <p>Total Students: {record.students.length}</p>

          <button
            className="delete-btn"
            onClick={() => handleDeleteAttendance(record._id)}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}

export default TeacherAttendance;
