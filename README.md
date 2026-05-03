# 🚀 Asteroid 3D Pro: Advanced Orbital Simulation & ML Classification

![Hero Banner](asteroid_hero_banner_1777794512335.png)

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB.svg?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/3D-Three.js-black.svg?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-F7931E.svg?style=flat-square&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**Asteroid 3D Pro** is a high-fidelity, interactive space simulation platform that combines cinematic 3D visualization with machine learning to classify and track asteroids within our solar system. Built with modern web technologies, it provides a seamless bridge between complex orbital mechanics and intuitive data visualization.

---

## ✨ Key Features

### 🌌 Cinematic 3D Simulation
- **Interactive Solar System**: Fully explorable 3D environment powered by **React Three Fiber** and **Three.js**.
- **Real-time Orbit Rendering**: Dynamic calculation and rendering of asteroid paths based on orbital parameters.
- **Cinematic Camera**: Multiple view modes including **Free Camera** and **Following Focused** for an immersive experience.
- **Planet Details**: High-resolution planet models with real physical data (Mass, Gravity, Temperature).

### 🤖 ML-Powered Orbit Classification
- **Intelligent Classification**: Automatically classifies asteroids into orbit types (Amor, Apollo, Aten, MBA, etc.) using a pre-trained **Random Forest** model.
- **Data-Driven Insights**: Uses key orbital features:
  - **Semi-major axis (a)**
  - **Eccentricity (e)**
  - **Inclination (i)**
- **Historical Tracking**: Integrated SQLite database to log and retrieve prediction history.

### 🛠️ Advanced Physics Engine
- **Physics Modes**: Toggle between **Normal**, **Distort**, **Reverse**, and **Lift** modes to visualize gravitational effects.
- **Orbital Speed Control**: Adjust time scales to observe long-term orbital patterns in seconds.

---

## 📸 Screenshots

| Cinematic Overview | Following Focused Asteroid |
|:---:|:---:|
| ![Overview](Screenshot%202026-05-03%20130013.jpg) | ![Focused](Screenshot%202026-05-03%20130751.jpg) |

| Orbital Mechanics | Planetary Exploration |
|:---:|:---:|
| ![Mechanics](Screenshot%202026-05-03%20130938.jpg) | ![Saturn View](Screenshot%202026-05-03%20131115.jpg) |

---

## 🛠️ Tech Stack

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

### Machine Learning
- **Scikit-Learn**: Model training and evaluation.
- **Pandas**: Data processing and CSV handling.
- **Dataset**: NASA/JPL Small-Body Database (Asteroid Orbital Elements).

---

## 🤖 Machine Learning Pipeline

### Model Architecture
The system employs a **Random Forest Classifier** to categorize asteroids into specific orbital families. The model is trained on the JPL dataset, achieving high precision by analyzing non-linear relationships between orbital elements.

- **Algorithm**: Random Forest (100 estimators)
- **Features Analyzed**:
  - `a`: Semi-major axis (Average distance from the Sun)
  - `e`: Eccentricity (Degree of orbital elongation)
  - `i`: Inclination (Tilt of the orbit relative to the ecliptic plane)
- **Target Classes**: Amor, Apollo, Aten, MBA, Hungaria, and more.

### Training Workflow
1. **Data Ingestion**: Processing 79,000+ records from `train_dataset.csv`.
2. **Feature Engineering**: Handling missing values and normalizing orbital parameters.
3. **Model Persistence**: Serialized using `joblib` for rapid inference in the FastAPI backend.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/asteroid-3d-system.git
   cd asteroid-3d-system
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

---

## 📊 Dataset Information

The system utilizes the `train_dataset.csv` containing over 79,000 asteroid records. This dataset includes physical and orbital parameters sourced from the **JPL Small-Body Database**.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ for Space Explorers and Data Scientists.
</p>
