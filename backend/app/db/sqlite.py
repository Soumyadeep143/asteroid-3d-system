import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "../../asteroid_system.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            a REAL,
            e REAL,
            i REAL,
            predicted_class TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def log_prediction(a, e, i, predicted_class):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO predictions (a, e, i, predicted_class)
        VALUES (?, ?, ?, ?)
    ''', (a, e, i, predicted_class))
    conn.commit()
    conn.close()

def get_history(limit=10):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM predictions ORDER BY timestamp DESC LIMIT ?', (limit,))
    rows = cursor.fetchall()
    conn.close()
    
    history = []
    for row in rows:
        history.append({
            "id": row[0],
            "a": row[1],
            "e": row[2],
            "i": row[3],
            "predicted_class": row[4],
            "timestamp": row[5]
        })
    return history
