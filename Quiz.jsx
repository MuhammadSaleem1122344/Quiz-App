import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

const questions = [
  // Easy
  { level: "easy", question: "Which HTML tag is used to display the largest heading?", options: ["<h6>", "<h1>", "<heading>", "<h4>"], answer: "<h1>" },
  { level: "easy", question: "Which CSS property is used to change text color?", options: ["font-color", "text-style", "color", "background-color"], answer: "color" },
  { level: "easy", question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "int", "string", "declare"], answer: "var" },
  { level: "easy", question: "Which HTML tag is used for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<hr>"], answer: "<br>" },
  { level: "easy", question: "Which symbol is used for single-line comments in JavaScript?", options: ["<!-- -->", "//", "/* */", "#"], answer: "//" },

  // Medium
  { level: "medium", question: "Which CSS property controls the text size?", options: ["font-size", "text-style", "text-size", "font-weight"], answer: "font-size" },
  { level: "medium", question: "Which HTML attribute is used to provide an alternative text for an image?", options: ["alt", "title", "src", "longdesc"], answer: "alt" },
  { level: "medium", question: "Which operator is used to compare both value and type in JavaScript?", options: ["==", "===", "!=", "="], answer: "===" },
  { level: "medium", question: "Which CSS property is used to make text bold?", options: ["font-weight", "bold", "text-style", "font-bold"], answer: "font-weight" },
  { level: "medium", question: "Which method is used to select an element by ID in JavaScript?", options: ["getElementById()", "querySelectorAll()", "getById()", "findElement()"], answer: "getElementById()" },

  // Hard
  { level: "hard", question: "In CSS, what is the difference between relative and absolute positioning?", options: ["Relative moves element relative to itself; absolute positions relative to nearest positioned ancestor", "Both are the same", "Absolute is always relative to viewport", "Relative is always fixed"], answer: "Relative moves element relative to itself; absolute positions relative to nearest positioned ancestor" },
  { level: "hard", question: "Which HTML5 element is used for drawing graphics via JavaScript?", options: ["<canvas>", "<svg>", "<graphics>", "<draw>"], answer: "<canvas>" },
  { level: "hard", question: "What will `console.log([] + {});` output in JavaScript?", options: ["[object Object]", "Error", "[]{}", "undefined"], answer: "[object Object]" },
  { level: "hard", question: "What does the `z-index` property in CSS control?", options: ["Text size", "Stacking order of elements", "Element position", "Background color"], answer: "Stacking order of elements" },
  { level: "hard", question: "Which JavaScript method is used to parse a JSON string into an object?", options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "Object.parse()"], answer: "JSON.parse()" },
];

function Quiz() {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, roll } = location.state || { name: "Unknown", roll: "N/A" };

  // ✅ Shuffle questions on mount
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled.slice(0, 10)); // sirf 10 questions
  }, []);

  // ✅ Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft]);

  // ✅ Select answer
  const handleSelect = (qIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  // ✅ Submit quiz
  const handleSubmit = () => {
    let score = 0;
    shuffledQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) score++;
    });

    navigate("/result", {
      state: { score, total: shuffledQuestions.length, name, roll },
    });
  };

  // ✅ Loading case
  if (shuffledQuestions.length === 0) {
    return <div className="container"><p>Loading quiz...</p></div>;
  }

  return (
    <div className="container">
      <h2>📘 Quiz</h2>
      <p className="timer">⏳ Time Left: {timeLeft}s</p>

      {shuffledQuestions.map((q, i) => (
        <div key={i} className="question-card">
          <p><b>Q{i + 1}:</b> {q.question}</p>
          <div className="options">
            {q.options.map((option, j) => (
              <button
                key={j}
                className={`option-btn ${selectedAnswers[i] === option ? "selected" : ""}`}
                onClick={() => handleSelect(i, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="quiz-footer">
        <button
          disabled={Object.keys(selectedAnswers).length < shuffledQuestions.length}
          onClick={handleSubmit}
        >
          ✅ Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;
