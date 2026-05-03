import React, { useState, useEffect } from 'react';
import SolarSystem from './components/SolarSystem';
import './App.css';

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("normal");
  const [speed, setSpeed] = useState(0.5);
  const [history, setHistory] = useState([]);
  const [follow, setFollow] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const colors = ["#4facfe", "#00f2fe", "#7f00ff", "#ff4d4d", "#ffcc00", "#00ff88"];

  useEffect(() => {
    fetchAsteroids();
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAsteroids = () => {
    setLoading(true);
    fetch('http://localhost:8000/orbit/list?limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          setLoading(false);
          return;
        }
        const asteroidsWithColors = data.map((ast, i) => ({
          ...ast,
          color: colors[i % colors.length]
        }));
        setAsteroids(asteroidsWithColors);
        setLoading(false);
        
        // Log the first one for history
        const first = asteroidsWithColors[0];
        fetch(`http://localhost:8000/predict/?a=${first.a}&e=${first.e}&i=${first.i}`)
          .then(() => fetchHistory());
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchHistory = () => {
    fetch('http://localhost:8000/predict/history?limit=5')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setHistory(data);
      })
      .catch(err => console.error(err));
  };

  const focusedAsteroid = asteroids[focusedIndex];

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <h1>ASTEROID 3D PRO</h1>
          <div className="search-box">
            <label>Focused ID: </label>
            <select 
              value={focusedIndex} 
              onChange={(e) => setFocusedIndex(parseInt(e.target.value))}
            >
              {asteroids.map((ast, i) => (
                <option key={i} value={i}>Asteroid {i} ({ast.Orbit_type})</option>
              ))}
            </select>
          </div>
        </div>
        
        {loading ? <p className="status">SYNCING GALAXY...</p> : (
          focusedAsteroid ? (
            <div className="dashboard">
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              <div className="stats">
                <div className="stat-item">
                  <label>ORBIT CLASS</label>
                  <span className="value highlighting" style={{ color: focusedAsteroid.color }}>{focusedAsteroid.Orbit_type || 'Unknown'}</span>
                </div>
                <div className="stat-item">
                  <label>SEMI-MAJOR AXIS (a)</label>
                  <span className="value">{(focusedAsteroid.a || 0).toFixed(4)} AU</span>
                </div>
                <div className="stat-item">
                  <label>ECCENTRICITY (e)</label>
                  <span className="value">{(focusedAsteroid.e || 0).toFixed(4)}</span>
                </div>
              </div>

              <div className="sim-controls">
                <div className="control-group">
                  <label>PHYSICS MODE</label>
                  <div className="buttons">
                    <button onClick={() => setMode("normal")} className={mode === "normal" ? "active" : ""}>Normal</button>
                    <button onClick={() => setMode("distort")} className={mode === "distort" ? "active" : ""}>Distort</button>
                    <button onClick={() => setMode("reverse")} className={mode === "reverse" ? "active" : ""}>Reverse</button>
                    <button onClick={() => setMode("lift")} className={mode === "lift" ? "active" : ""}>Lift</button>
                  </div>
                </div>
                <div className="control-group">
                  <label>ORBITAL SPEED: {speed.toFixed(1)}x</label>
                  <input 
                    type="range" 
                    min="0" max="2" step="0.1" 
                    value={speed} 
                    onChange={(e) => setSpeed(parseFloat(e.target.value))} 
                  />
                </div>
                <div className="control-group">
                  <label>VIEW MODE</label>
                  <button onClick={() => setFollow(!follow)} className={follow ? "active" : ""}>
                    {follow ? "Following Focused" : "Free Camera"}
                  </button>
                </div>
              </div>
            </div>
          ) : <p className="status error">SYSTEM OFFLINE</p>
        )}

        <div className="history-sidebar">
          <label>LOG HISTORY</label>
          {history && history.map((item, i) => (
            <div key={i} className="history-item">
              <span>{item.predicted_class}</span>
              <small>a={(item.a || 0).toFixed(2)}</small>
            </div>
          ))}
        </div>
      </header>

      <main>
        <SolarSystem 
          asteroids={asteroids} 
          focusedAsteroid={focusedAsteroid} 
          mode={mode} 
          speed={speed} 
          follow={follow} 
        />
      </main>
    </div>
  );
}

export default App;
