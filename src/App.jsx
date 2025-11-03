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
        <div className="container">
        <ExerciseForm addExercise={addExercise} />
        <ExerciseList exercises={exercises} setExercises={setExercises} />
      </div>
    </div>
  );
}

export default App;
