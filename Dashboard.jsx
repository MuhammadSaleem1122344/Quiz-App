// Dashboard.jsx
import React from "react";
import { students } from "./data/Students";
import "../App.css";

function Dashboard() {
  const activeCount = students.filter((s) => s.status === "active").length;
  const pendingCount = students.filter((s) => s.status === "pending").length;
  const totalCount = students.length;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Student Status Dashboard</h2>
      <p className="dashboard-subtitle">Total Students: {totalCount}</p>

      <div className="card-container">
        <div className="card active-card">
          <h3>✅ Active Students</h3>
          <p className="count">{activeCount}</p>
        </div>

        <div className="card pending-card">
          <h3>⏳ Pending Students</h3>
          <p className="count">{pendingCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
