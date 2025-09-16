import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎯 Welcome to Quiz App</h1>
      <Link to="/quiz">
        <button style={{ padding: "10px 20px", fontSize: "18px" }}>Start Quiz</button>
      </Link>
    </div>
  );
}

export default Home;
