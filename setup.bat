@echo off
echo =========================================
echo Installing Asteroid 3D System Dependencies...
echo =========================================

echo.
echo [1/2] Setting up Backend (FastAPI)...
cd backend
echo Creating virtual environment...
python -m venv venv
echo Activating virtual environment and installing requirements...
call .\venv\Scripts\activate && pip install -r requirements.txt
cd ..

echo.
echo [2/2] Setting up Frontend (React)...
cd frontend
echo Installing npm packages...
call npm install
cd ..

echo.
echo =========================================
echo Setup completed successfully!
echo You can now run the application using start.bat
echo =========================================
pause
