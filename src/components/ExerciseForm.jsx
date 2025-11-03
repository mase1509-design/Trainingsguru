import React, { useState } from "react";

function ExerciseForm({ addExercise }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addExercise({ id: Date.now(), name, description, workouts: [] });
    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Neue Übung hinzufügen</h2>
      <input
        type="text"
        placeholder="Übungsname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Beschreibung (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
}

export default ExerciseForm;
