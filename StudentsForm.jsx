import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function StudentForm() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (name && roll) {
      const newStudent = { name, roll };
      setStudents([...students, newStudent]);
      setName("");
      setRoll("");
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleStartQuiz = () => {
    if (students.length > 0) {
      navigate("/quiz", { state: { students } });
    } else {
      alert("Add at least one student before starting the quiz!");
    }
  };

  return (
    <div>
      {/* 🔹 Navbar */}
      <nav className="navbar">
        <h2 className="logo">QuizMaster 🎓</h2>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/quiz" className="nav-link">Quiz</Link>
          <Link to="/result" className="nav-link">Result</Link>
        </div>
      </nav>

      {/* 🔹 Form Section */}
      <div className="container">
        <h2>Add Students</h2>
        <form onSubmit={handleAddStudent} className="form-box">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Roll No"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
          <button type="submit">➕ Add Student</button>
        </form>

        {/* 🔹 Student List */}
        {students.length > 0 && (
          <div className="student-list">
            <h3>📋 Added Students</h3>
            <ul>
              {students.map((s, index) => (
                <li key={index}>
                  {s.name} (Roll: {s.roll})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 🔹 Start Quiz Button */}
        <button 
          className="start-btn" 
          onClick={handleStartQuiz}
          disabled={students.length === 0}
        >
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}

export default StudentForm;
