import React, { useState, useEffect } from "react";
import ExerciseList from "./components/ExerciseList";
import ExerciseForm from "./components/ExerciseForm";
import "./styles.css";
import "./logo.css";

function App() {
  return (
    <div>
      <header className="app-header">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Trainingsguru Logo"
          className="app-logo"
        />
        <h1 className="app-title">Trainingsguru</h1>
      </header>
    </div>
  );
}
