import React, { useState } from "react";

function WorkoutEntryForm({ exercise, exercises, setExercises }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sets, setSets] = useState([{ reps: "", weight: "" }]);

  const addSet = () => setSets([...sets, { reps: "", weight: "" }]);
  const handleChange = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExercise = { ...exercise };
    updatedExercise.workouts.unshift({ date, sets });
    const newExercises = exercises.map(ex => ex.id === exercise.id ? updatedExercise : ex);
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
    setSets([{ reps: "", weight: "" }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Training für {exercise.name} hinzufügen</h3>
      <label>Datum:</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {sets.map((s, i) => (
        <div key={i}>
          <input
            type="number"
            placeholder="Wiederholungen"
            value={s.reps}
            onChange={(e) => handleChange(i, "reps", e.target.value)}
          />
          <input
            type="number"
            placeholder="Gewicht"
            value={s.weight}
            onChange={(e) => handleChange(i, "weight", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addSet}>Satz hinzufügen</button>
      <button type="submit">Speichern</button>
    </form>
  );
}

export default WorkoutEntryForm;
