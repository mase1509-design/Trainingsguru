import React, { useState, useEffect } from "react";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import "./styles.css";

function App() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("exercises");
    if (stored) setExercises(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <div>
      <header
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL || ''}logo.png`}
          alt="Trainingsguru Logo"
          style={{
            height: "100px",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.3)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
          }}
        />
        <h1
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "2rem",
            marginTop: "15px",
            color: "#333",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Trainingsguru
        </h1>
      </header>

      <div className="container">
        <ExerciseForm addExercise={addExercise} />
        <ExerciseList exercises={exercises} setExercises={setExercises} />
      </div>
    </div>
  );
}

export default App;
