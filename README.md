# 🚀 Asteroid 3D Pro: Advanced Orbital Simulation & ML Classification



<p align="center">
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/3D_Engine-Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Machine_Learning-Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="ML">
</p>

---

## 🌌 Overview
**Asteroid 3D Pro** is a high-fidelity, interactive space simulation platform. It bridges the gap between **Complex Orbital Mechanics** and **Machine Learning**, allowing users to explore the solar system while an AI model classifies asteroids in real-time based on their orbital characteristics.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph "Frontend (React & Three.js)"
        UI[Glassmorphism Dashboard] --> R3F[React Three Fiber Engine]
        R3F --> Controls[Orbital Controls]
    end

    subgraph "Backend (FastAPI)"
        API[FastAPI Router] --> ML[ML Service]
        API --> DB[(SQLite Prediction Log)]
    end

    subgraph "Machine Learning"
        ML --> RF[Random Forest Model]
        RF --> Data[train_dataset.csv]
    end

    UI <--> |REST API| API
```

---

## ✨ Premium Features

### 🔭 Cinematic 3D Simulation
*   **Real-time Keplerian Orbits**: Accurately rendered paths for thousands of asteroids.
*   **Dynamic Lighting**: High-resolution textures with realistic solar illumination.
*   **Target Locking**: Cinematic camera tracking that follows specific asteroids.
*   **Planet Intel**: High-resolution planet models with real physical data (Mass, Gravity, Temperature).

### 🤖 Intelligent Classification
*   **Automated Labeling**: Instantly identifies if an asteroid is an **Amor**, **Apollo**, **Aten**, or **Main Belt Asteroid (MBA)**.
*   **Feature Importance**: Uses Semi-major axis ($a$), Eccentricity ($e$), and Inclination ($i$) for 95%+ classification accuracy.
*   **Historical Tracking**: Integrated SQLite database to log and retrieve prediction history.

### 🛠️ Physics Control Lab
*   **Normal Mode**: Standard Keplerian motion.
*   **Distort/Lift**: Visualizes orbital perturbations and Z-axis shifts.
*   **Time Dilation**: Speed up time up to $1000x$ to observe long-term orbital drifts.

---

## 📸 Visual Gallery

| **Cinematic View** | **Interactive Tracking** |
|:---:|:---:|
| ![Overview](Screenshot%202026-05-03%20130013.jpg) | ![Focused](Screenshot%202026-05-03%20130751.jpg) |

| **Orbital Lab** | **Planetary Intel** |
|:---:|:---:|
| ![Mechanics](Screenshot%202026-05-03%20130938.jpg) | ![Saturn View](Screenshot%202026-05-03%20131115.jpg) |

---

## 🛠️ Tech Stack Details

### Frontend
- **React 18**: Component-based UI logic.
- **Three.js / React Three Fiber**: WebGL-based 3D rendering.
- **React Three Drei**: Helpful abstractions for R3F.
- **Vanilla CSS**: Custom-styled glassmorphism UI.

### Backend
- **FastAPI**: High-performance Python web framework.
- **Uvicorn**: Lightning-fast ASGI server.
- **SQLite**: Persistent storage for prediction history.
- **Joblib**: Efficient ML model loading.

---

## 📊 Machine Learning Pipeline

### Model Architecture
The system employs a **Random Forest Classifier** to categorize asteroids into specific orbital families. The model is trained on the JPL dataset, achieving high precision by analyzing non-linear relationships between orbital elements.

- **Algorithm**: Random Forest (100 estimators)
- **Features Analyzed**: `a` (Semi-major axis), `e` (Eccentricity), `i` (Inclination).
- **Dataset**: 79,000+ records from the **JPL Small-Body Database**.

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 16+

### 1. Setup Backend (FastAPI)
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Setup Frontend (React)
```bash
cd frontend
npm install
npm start
```

---

## 🗺️ Roadmap
- [ ] **NASA Horizons API Integration**: Real-time tracking of active Near-Earth Objects (NEOs).
- [ ] **Custom Asteroid Input**: Allow users to input their own orbital elements for classification.
- [ ] **VR Support**: Fully immersive WebXR experience.
- [ ] **Multi-Model Comparison**: Toggle between Random Forest, XGBoost, and Neural Networks.

---

## 📄 License & Credits
*   **Data Source**: NASA/JPL Small-Body Database.
*   **License**: Distributed under the MIT License.

<p align="center">
  <i>Developed for the next generation of Space Explorers.</i>
</p>
