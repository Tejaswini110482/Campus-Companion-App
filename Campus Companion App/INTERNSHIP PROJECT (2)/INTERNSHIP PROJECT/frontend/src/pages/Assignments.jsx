// frontend/pages/Assignments.jsx
import React, { useEffect, useState } from "react";
import API from "../services/api.js";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    API.get("/assignments")
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment._id}>{assignment.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Assignments;
