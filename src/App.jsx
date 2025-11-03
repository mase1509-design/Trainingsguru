import React, { useState, useEffect } from "react";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import "./styles.css";
import "./logo.css";

function App() {
  const [exercises, setExercises] = useState([]);

  // Lade Übungen aus localStorage beim Start
  useEffect(() => {
    const stored = localStorage.getItem("exercises");
    if (stored) setExercises(JSON.parse(stored));
  }, []);

  // Speichere Übungen in localStorage bei Änderungen
  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };

  return (
    <div>
      {/* Header mit Logo */}
      <header className="app-header">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Trainingsguru Logo"
          className="app-logo"
        />
        <h1 className="app-title">Fitness Tracker</h1>
      </header>

      {/* Hauptinhalt */}
      <div className="container">
        <ExerciseForm addExercise={addExercise} />
        <ExerciseList exercises={exercises} setExercises={setExercises} />
      </div>
    </div>
  );
}

export default App;
