import React, { useState } from "react";
import WorkoutEntryForm from "./WorkoutEntryForm";
import WorkoutHistory from "./WorkoutHistory";

function ExerciseList({ exercises, setExercises }) {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div>
      <h2>Übungen</h2>
      {exercises.map((ex) => (
        <div key={ex.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <strong>{ex.name}</strong>
          {ex.description && <p>{ex.description}</p>}
          <button onClick={() => setSelectedExercise(ex)}>Training eintragen</button>
        </div>
      ))}

      {selectedExercise && (
        <div>
          <WorkoutEntryForm
            exercise={selectedExercise}
            exercises={exercises}
            setExercises={setExercises}
          />
          <WorkoutHistory exercise={selectedExercise} />
        </div>
      )}
    </div>
  );
}

export default ExerciseList;
