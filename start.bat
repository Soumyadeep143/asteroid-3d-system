@echo off
echo =========================================
echo Starting Asteroid 3D System...
echo =========================================

echo.
echo [1/2] Starting FastAPI Backend...
start "Backend (FastAPI)" cmd /k "cd backend && call .\venv\Scripts\activate && uvicorn app.main:app --reload"

echo.
echo [2/2] Starting React Frontend...
start "Frontend (React)" cmd /k "cd frontend && npm start"

echo.
echo =========================================
echo Both services have been started in new windows!
echo =========================================
pause
