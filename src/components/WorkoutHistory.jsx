import React from "react";

function WorkoutHistory({ exercise }) {
  if (!exercise.workouts || exercise.workouts.length === 0) return null;

  return (
    <div>
      <h3>Trainingshistorie für {exercise.name}</h3>
      <table>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Sätze (Reps / Gewicht)</th>
          </tr>
        </thead>
        <tbody>
          {exercise.workouts.map((w, idx) => (
            <tr key={idx}>
              <td>{w.date}</td>
              <td>
                {w.sets.map((s, i) => (
                  <div key={i}>{s.reps} × {s.weight} kg</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkoutHistory;
