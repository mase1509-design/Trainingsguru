from flask import Flask, render_template, request, redirect, url_for
import sqlite3
from datetime import datetime

app = Flask(__name__)
DATABASE = 'trainings.db'

# --- Datenbank initialisieren ---
def init_db():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS exercises (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                )''')
    c.execute('''CREATE TABLE IF NOT EXISTS progress (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    exercise_id INTEGER,
                    value TEXT,
                    date TEXT,
                    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
                )''')
    conn.commit()
    conn.close()

# --- Startseite ---
@app.route('/')
def index():
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT * FROM exercises")
    exercises = c.fetchall()
    conn.close()
    return render_template('index.html', exercises=exercises)

# --- Übung hinzufügen ---
@app.route('/add_exercise', methods=['GET', 'POST'])
def add_exercise():
    if request.method == 'POST':
        name = request.form['name']
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute("INSERT INTO exercises (name) VALUES (?)", (name,))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))
    return render_template('add_exercise.html')

# --- Fortschritt hinzufügen ---
@app.route('/add_progress/<int:exercise_id>', methods=['GET', 'POST'])
def add_progress(exercise_id):
    if request.method == 'POST':
        value = request.form['value']
        date = datetime.now().strftime("%Y-%m-%d")
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute("INSERT INTO progress (exercise_id, value, date) VALUES (?, ?, ?)",
                  (exercise_id, value, date))
        conn.commit()
        conn.close()
        return redirect(url_for('view_progress', exercise_id=exercise_id))
    return render_template('add_progress.html', exercise_id=exercise_id)

# --- Fortschritt anzeigen ---
@app.route('/view_progress/<int:exercise_id>')
def view_progress(exercise_id):
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute("SELECT name FROM exercises WHERE id=?", (exercise_id,))
    exercise = c.fetchone()
    c.execute("SELECT value, date FROM progress WHERE exercise_id=? ORDER BY date DESC", (exercise_id,))
    progress = c.fetchall()
    conn.close()
    return render_template('view_progress.html', exercise=exercise, progress=progress)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
