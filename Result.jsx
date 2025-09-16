import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, name, roll } = location.state || {};

  return (
    <div className="container">
      <h2>📊 Quiz Result</h2>
      <p><b>Name:</b> {name}</p>
      <p><b>Roll No:</b> {roll}</p>
      <p><b>Score:</b> {score} / {total}</p>
      <p className={score >= total / 2 ? "pass" : "fail"}>
        {score >= total / 2 ? "🎉 Congratulations! You Passed!" : "❌ Better Luck Next Time!"}
      </p>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
}

export default Result;
